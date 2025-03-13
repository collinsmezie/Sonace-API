import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from './../users/entities/user.entity';
import { PinnedLocation } from './../pinned-locations/entities/pinned-location.entity';
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { s3 } from '../config/s3.config';
import { v4 as uuidv4 } from 'uuid';


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

  async uploadPosts(
    files: Express.Multer.File[],
    userId: string,
    title: string,
    latitude: string,
    longitude: string,
    locationName?: string,
    description?: string,
  ): Promise<{ message: string; postId: string; uploadedImages: string[]; failedUploads: string[] }> {
    // Ensure the user exists
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    // Upload all images to S3 in parallel with error handling
    const uploadResults = await Promise.allSettled(
      files.map(file => {
        const key = `uploads/${uuidv4()}-${file.originalname}`;
        return this.uploadToS3(file, key);
      })
    );

    // Process upload results
    const uploadedImages = uploadResults
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<string>).value);

    const failedUploads = uploadResults
      .filter(result => result.status === 'rejected')
      .map(result => (result as PromiseRejectedResult).reason.message || 'Unknown error');

    // Ensure at least one image was uploaded successfully
    if (uploadedImages.length === 0) {
      throw new InternalServerErrorException('Failed to upload any images. Please try again.');
    }

    // Check if the location exists based on latitude and longitude and userid
    let location = await this.locationRepository.findOne({ where: { latitude, longitude, created_by: {id: user.id} } });

    // If the location doesn't exist, create a new one
    if (!location) {
      location = this.locationRepository.create({
        name: locationName || 'Unnamed Location',
        latitude,
        longitude,
        created_by: user,
      });
      location = await this.locationRepository.save(location);
    }

    // Create and save the new post
    const newPost = this.postRepository.create({
      title,
      description,
      post_urls: uploadedImages,
      user,
      location,
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
    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${post.post_urls}`;
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
      console.error('[S3] Error uploading profile image to S3:', error);
      throw new InternalServerErrorException('Failed to upload profile image. Please try again later.');
    }
  }

}
