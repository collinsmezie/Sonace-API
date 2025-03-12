// import { Injectable } from '@nestjs/common';
// import { S3Client, PutObjectCommand, PutObjectCommandInput, ObjectCannedACL } from '@aws-sdk/client-s3';
// import { s3 } from '../config/s3.config';
// import { v4 as uuidv4 } from 'uuid';

// @Injectable()
// export class PostsService {
//   private readonly bucketName = process.env.AWS_S3_BUCKET_NAME;

//   async uploadPost(file: Express.Multer.File): Promise<string> {
//     const key = `uploads/${uuidv4()}-${file.originalname}`;

//     const uploadParams: PutObjectCommandInput = {
//       Bucket: this.bucketName,
//       Key: key,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//       ACL: ObjectCannedACL.public_read
//     };
    
//     await s3.send(new PutObjectCommand(uploadParams));

//     return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from './../users/entities/user.entity';
import { PinnedLocation } from './../pinned-locations/entities/pinned-location.entity';
import { S3Client, PutObjectCommand, PutObjectCommandInput, ObjectCannedACL } from '@aws-sdk/client-s3';
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
  ) {}

  async uploadPost(
    file: Express.Multer.File,
    userId: string,
    title: string,
    latitude: string,
    longitude: string,
    locationName?: string,
    description?: string,
  ): Promise<{ message: string; postId: string }> {
    const key = `uploads/${uuidv4()}-${file.originalname}`;

    const uploadParams: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      // ACL: ObjectCannedACL.public_read,
    };
    
    await s3.send(new PutObjectCommand(uploadParams));

    // Ensure the user exists
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    // Check if the location exists
    let location = await this.locationRepository.findOne({
      where: { latitude, longitude },
    });

    // If the location doesn't exist, create a new one
    if (!location) {
      location = this.locationRepository.create({
        name: locationName || 'Unnamed Location',
        latitude,
        longitude,
        created_by: user,
      });
      location = await this.locationRepository.save(location);
      console.log("SEE LOCATION", location);
    }

    // Create and save the new post
    const newPost = this.postRepository.create({
      title,
      description,
      post_url: key, // Store only the S3 key
      user,
      location,
    });
    const savedPost = await this.postRepository.save(newPost);
    console.log("SEE POST", savedPost);

    return {
      message: 'Post uploaded successfully',
      postId: savedPost.id,
    };
  }

  getFullPostUrl(post: Post): string {
    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${post.post_url}`;
  }
}
