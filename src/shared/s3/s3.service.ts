import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { S3Client, PutObjectCommand, PutObjectCommandInput, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { InternalServerErrorException } from '@nestjs/common';
import { s3 } from './s3.config';


@Injectable()
export class S3Service {
  private readonly s3 = new AWS.S3();
  private readonly logger = new Logger(S3Service.name);
  private readonly bucketName = process.env.AWS_S3_BUCKET_NAME;
  private readonly region = process.env.AWS_REGION;


  async uploadToS3(file: Express.Multer.File, key: string): Promise<string> {

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

  async deleteFromS3(key: string): Promise<void> {
    try {
      await s3.send(new DeleteObjectCommand({ Bucket: this.bucketName, Key: key }));
    } catch (error) {
      console.error('Error deleting old profile image from S3:', error);
      throw new InternalServerErrorException('Failed to delete old profile image.');
    }
  }



  async deleteFolder(prefixes: string[]): Promise<string[]> {
    const failedPrefixes: string[] = [];

    for (const prefix of prefixes) {
      try {
        const listedObjects = await this.s3.listObjectsV2({ Bucket: this.bucketName, Prefix: prefix }).promise();
        if (!listedObjects.Contents?.length) continue;

        const objectsToDelete = listedObjects.Contents.map(obj => ({ Key: obj.Key }));
        await this.s3.deleteObjects({ Bucket: this.bucketName, Delete: { Objects: objectsToDelete } }).promise();

        this.logger.log(`Deleted all objects under ${prefix}`);
      } catch (error) {
        this.logger.error(`Failed to delete folder: ${prefix}`, error);
        failedPrefixes.push(prefix);
      }
    }
    return failedPrefixes;
  }
}
