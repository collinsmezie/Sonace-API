// import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Post } from './entities/post.entity';
// import { User } from './../users/entities/user.entity';
// import { PinnedLocation } from './../pinned-locations/entities/pinned-location.entity';
// import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
// import { s3 } from '../config/s3.config';
// import { v4 as uuidv4 } from 'uuid';

// @Injectable()
// export class PostsService {
//   private readonly bucketName = process.env.AWS_S3_BUCKET_NAME;
//   private readonly region = process.env.AWS_REGION;

//   constructor(
//     @InjectRepository(Post)
//     private readonly postRepository: Repository<Post>,
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//     @InjectRepository(PinnedLocation)
//     private readonly locationRepository: Repository<PinnedLocation>,
//   ) { }

//   async uploadPosts(
//     files: Express.Multer.File[],
//     userId: string,
//     postText: string,
//     latitude: string,
//     longitude: string,
//     locationName?: string,
//     markerImage?: Express.Multer.File, // Separate marker image file
//   ): Promise<{ message: string; postId: string; uploadedFiles: string[]; failedUploads: string[]; markerImageUrl?: string }> {
//     // Ensure the user exists
//     const user = await this.userRepository.findOne({ where: { id: userId } });
//     if (!user) throw new NotFoundException('User not found - user may have been deleted or does not exist.');

//     // Upload marker image separately if provided
//     let markerImageUrl: string | undefined;
//     if (markerImage) {
//       try {
//         const markerKey = `markers/${uuidv4()}-${markerImage.originalname}`;
//         markerImageUrl = await this.uploadToS3(markerImage, markerKey);
//       } catch (error) {
//         markerImageUrl = undefined;
//         // Log error for debugging
//         console.error('[UPLOAD ERROR] Marker image upload failed:', error);
//         // throw an error if the marker image fails to upload
//         throw new InternalServerErrorException('Failed to upload marker image. Please try again.');
//       }
//     }

//     // Upload all images to S3 in parallel with error handling
//     const uploadResults = await Promise.allSettled(
//       files.map(file => {
//         const key = `posts/${uuidv4()}-${file.originalname}`;
//         return this.uploadToS3(file, key);
//       })
//     );

//     // Process uploaded images
//     const uploadedFiles = uploadResults
//       .filter(result => result.status === 'fulfilled')
//       .map(result => (result as PromiseFulfilledResult<string>).value);

//     const failedUploads = uploadResults
//       .filter(result => result.status === 'rejected')
//       .map(result => (result as PromiseRejectedResult).reason.message || 'Unknown error');

//     // Ensure at least one image was uploaded successfully
//     if (uploadedFiles.length === 0) {
//       console.error('[UPLOAD ERROR] All uploads failed:', failedUploads);
//       throw new InternalServerErrorException('Failed to upload any images. Please try again.');
//     }


//     // Check if the location exists based on latitude, longitude, and userId
//     let location = await this.locationRepository.findOne({
//       where: { latitude, longitude, created_by: { id: user.id } },
//     });

//     // If the location doesn't exist, create a new one
//     if (!location) {
//       location = this.locationRepository.create({
//         name: locationName || 'Unnamed Location',
//         latitude,
//         longitude,
//         created_by: user,
//       });
//       location = await this.locationRepository.save(location);
//     }

//     // Create and save the new post
//     const newPost = this.postRepository.create({
//       postText,
//       postUrls: uploadedFiles,
//       user,
//       location,
//       markerImageUrl: markerImageUrl, // Save marker image URL if available
//     });

//     const savedPost = await this.postRepository.save(newPost);

//     // Construct response message based on success/failure count
//     let message = 'Post uploaded successfully.';
//     if (failedUploads.length > 0) {
//       message += ` However, ${failedUploads.length} file(s) failed to upload.`;
//     }

//     return {
//       message,
//       postId: savedPost.id,
//       uploadedFiles,
//       failedUploads,
//       markerImageUrl, // Return marker image URL
//     };
//   }

//   getFullPostUrl(post: Post): string {
//     return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${post.postUrls}`;
//   }

//   private async uploadToS3(file: Express.Multer.File, key: string): Promise<string> {
//     if (file.originalname.includes("fail")) {
//       throw new Error(`Failed to upload - ${file.originalname}`);
//     }

//     try {
//       const uploadParams: PutObjectCommandInput = {
//         Bucket: this.bucketName,
//         Key: key,
//         Body: file.buffer,
//         ContentType: file.mimetype,
//       };

//       await s3.send(new PutObjectCommand(uploadParams));

//       // Return the full URL
//       return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
//     } catch (error) {
//       console.error('[S3] Error uploading image to S3:', error);
//       throw new InternalServerErrorException('Failed to upload image. Please try again later.');
//     }
//   }
// }







import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from './../users/entities/user.entity';
import { PinnedLocation } from './../pinned-locations/entities/pinned-location.entity';
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { s3 } from '../config/s3.config';
import { v4 as uuidv4 } from 'uuid';
import { PostResponseDto } from './dto/post-response.dto';


@Injectable()
export class PostsService {
  private readonly bucketName = process.env.AWS_S3_BUCKET_NAME;
  private readonly region = process.env.AWS_REGION;

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PinnedLocation)
    private readonly locationRepository: Repository<PinnedLocation>,
  ) { }

  async fetchAllPosts(): Promise<PostResponseDto[] | null> {
    const posts = await this.postRepository.find({
      relations: ['user', 'location'], // Ensure related data is fetched
    });

    return posts.map(post => ({
      postId: post.id,
      postText: post.postText,
      postType: post.postType,
      longitude: post.location.longitude,
      latitude: post.location.latitude,
      locationName: post.location.name,
      markerImage: post.markerImage,
      postUrls: post.postUrls,
      createdAt: post.createdAt,
      textBackgroundColor: post.textBackgroundColor,
      user: {
        userId: post.user.id,
        username: post.user.username,
        profileName: post.user.profileName,
        profileImage: post.user.profileImage,
      },
    }));
  }

  async fetchPostById(id: string): Promise<PostResponseDto | null> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'location'], // Ensure user and location are loaded
    });

    if (!post) throw new NotFoundException('Post not found');

    // Validate related entities before destructuring
    const { postText, postUrls, location, user } = post;

    if (!user) throw new NotFoundException('User associated with post not found');
    if (!location) throw new NotFoundException('Location associated with post not found');

    return {
      postId: post.id,
      postText,
      postType: post.postType,
      longitude: location.longitude,
      latitude: location.latitude,
      locationName: location.name,
      markerImage: post.markerImage,
      postUrls,
      createdAt: post.createdAt,
      textBackgroundColor: post.textBackgroundColor,
      user: {
        userId: user.id,
        username: user.username,
        profileName: user.profileName,
        profileImage: user.profileImage,
      },
    };
  }

  async uploadPosts(
    files: Express.Multer.File[] = [],
    id: string,
    postText: string,
    latitude: string,
    longitude: string,
    markerImage: string,
    locationName?: string,
    textBackgroundColor?: number,
    postType?: string
  ): Promise<{ message: string; postId: string; uploadedImages: string[]; failedUploads: string[] }> {
    // Ensure the user exists
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found - user may have been deleted or does not exist.');

    let uploadedImages: string[] = [];
    let failedUploads: string[] = [];

    // Upload files if they are provided
    if (files.length > 0) {
      // Upload all images to S3 in parallel with error handling
      const uploadResults = await Promise.allSettled(
        files.map(file => {
          const key = `posts/${uuidv4()}-${file.originalname}`;
          return this.uploadToS3(file, key);
        })
      );

      // Process upload results
      uploadedImages = uploadResults
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<string>).value);

      failedUploads = uploadResults
        .filter(result => result.status === 'rejected')
        .map(result => (result as PromiseRejectedResult).reason.message || 'Unknown error');

      // Ensure at least one image was uploaded successfully
      if (uploadedImages.length === 0) {
        console.error('[UPLOAD ERROR] All uploads failed:', failedUploads);
        throw new InternalServerErrorException('Failed to upload any images. Please try again.');
      }

      // Log failed uploads for potential retry logic
      if (failedUploads.length > 0) {
        console.warn('[UPLOAD WARNING] Some files failed to upload:', failedUploads);
      }
    }

    // Check if the location exists based on latitude, longitude, and userId
    let location = await this.locationRepository.findOne({
      where: { latitude, longitude, createdBy: { id: user.id } },
    });

    // If the location doesn't exist, create a new one
    if (!location) {
      location = this.locationRepository.create({
        name: locationName || 'Unnamed Location',
        latitude,
        longitude,
        createdBy: user,
      });
      location = await this.locationRepository.save(location);
    }

    // Create and save the new post
    const newPost = this.postRepository.create({
      postText,
      postUrls: uploadedImages,
      user,
      location,
      markerImage,
      textBackgroundColor,
      postType
    });

    const savedPost = await this.postRepository.save(newPost);

    // Construct response message based on success/failure count
    let message = 'Post uploaded successfully.';
    if (failedUploads.length > 0) {
      message += ` However, ${failedUploads.length} file(s) failed to upload.`;
    }

    return {
      message,
      postId: savedPost.id,
      uploadedImages,
      failedUploads,
    };
  }


  getFullPostUrl(post: Post): string {
    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${post.postUrls}`;
  }


  private async uploadToS3(file: Express.Multer.File, key: string): Promise<string> {

    if (file.originalname.includes("fail")) {
      throw new Error(`Failed to upload - ${file.originalname}`);
    }

    try {
      const uploadParams: PutObjectCommandInput = {
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      await s3.send(new PutObjectCommand(uploadParams));

      // Return the full URL
      return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
    } catch (error) {
      console.error('[S3] Error uploading file(s) to S3:', error);
      throw new InternalServerErrorException('Failed to upload file(s). Please try again later.');
    }
  }

}

