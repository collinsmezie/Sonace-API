import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, PutObjectCommandInput, ObjectCannedACL } from '@aws-sdk/client-s3';
import { s3 } from '../config/s3.config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostsService {
  private readonly bucketName = process.env.AWS_S3_BUCKET_NAME;

  async uploadPost(file: Express.Multer.File): Promise<string> {
    const key = `uploads/${uuidv4()}-${file.originalname}`;

    const uploadParams: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: ObjectCannedACL.public_read
    };
    
    await s3.send(new PutObjectCommand(uploadParams));

    return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }
}



