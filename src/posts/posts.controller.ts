// import {
//   Controller,
//   Post,
//   Body,
//   UseInterceptors,
//   UploadedFiles,
//   BadRequestException,
// } from '@nestjs/common';
// import { FileFieldsInterceptor } from '@nestjs/platform-express';
// import { PostsService } from './posts.service';
// import { CreatePostDto } from './dto/create-post.dto';

// @Controller('posts')
// export class PostsController {
//   constructor(private readonly postsService: PostsService) { }

//   @Post('new')
//   @UseInterceptors(
//     FileFieldsInterceptor(
//       [
//         { name: 'files', maxCount: 5 }, // Post files
//         { name: 'markerImage', maxCount: 1 }, // Marker image
//       ],
//       { limits: { fileSize: 50 * 1024 * 1024 } },
//     ),
//   )
//   async create(
//     @UploadedFiles()
//     files: { files?: Express.Multer.File[]; markerImage?: Express.Multer.File[] },
//     @Body() createPostDto: CreatePostDto,
//   ) {
//     const { userId, postText, latitude, longitude, locationName } = createPostDto;

//     if (!files.markerImage || files.markerImage.length === 0) {
//       throw new BadRequestException('No marker image uploaded');
//     }

//     if (!files.files || files.files.length === 0) {
//       throw new BadRequestException('No posts uploaded');
//     }

//     const result = await this.postsService.uploadPosts(
//       files.files, // Post files
//       userId,
//       postText,
//       latitude.toString(),
//       longitude.toString(),
//       locationName,
//       files.markerImage[0], // Marker image (single file)
//     );

//     return result;
//   }
// }










import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Param,
  RawBodyRequest,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Buffer } from 'buffer';
import { Request } from 'express';
import * as fs from 'fs';
import { isUUID } from 'class-validator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  private logFilePath = './logs/requests.log'; // Inside a logs folder

  @Get('all')
  async fetchAllPosts() {
    return await this.postsService.fetchAllPosts();
  }

  @Get(':id')
  async fetchPostById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid post ID format');
    }

    return await this.postsService.fetchPostById(id);
  }

  @Get('markers/:id')
  async fetchPostMarkersById(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid post ID format');
    }

    return await this.postsService.fetchPostMarkersById(id);
  }

  @Post('new')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'files', maxCount: 5 }], // Post files only
      { limits: { fileSize: 50 * 1024 * 1024 } },
    ),
  )
  async createPost(
    @UploadedFiles() files: { files?: Express.Multer.File[] } = {},
    @Body() createPostDto: CreatePostDto,
  ) {
    const { 
      userId, 
      postText, 
      latitude, 
      longitude, 
      locationName, 
      markerImage, 
      textBackgroundColor,
      postType
    } = createPostDto;

    const postFiles = files.files || [];

    const result = await this.postsService.uploadPosts(
      postFiles,
      userId,
      postText,
      latitude.toString(),
      longitude.toString(),
      locationName,
      markerImage,
      parseInt(textBackgroundColor, 16) || null,
      postType,
    );

    return result;
  }


  @Post('catch-request')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'files', maxCount: 5 }, // Post files
        { name: 'marker', maxCount: 1 }, // Marker image (if sent as multipart)
      ],
      { limits: { fileSize: 50 * 1024 * 1024 } },
    ),
  )
  async catchRequest(
    @UploadedFiles() files: { files?: Express.Multer.File[]; marker?: Express.Multer.File[] },
    @Req() req: RawBodyRequest<Request>,
  ) {
    console.log('📥 Incoming POST request to /posts/catch-request');

    // Log headers
    console.log('🔹 Headers:', req.headers);
    this.logToFile(`🔹 Headers: ${JSON.stringify(req.headers, null, 2)}`);

    // Log raw body (useful for debugging byte streams)
    console.log('🔹 Raw Body:', req.body);
    this.logToFile(`🔹 Raw Body: ${JSON.stringify(req.body, null, 2)}`);

    // Log uploaded files
    console.log('🔹 Uploaded Files:', files);
    this.logToFile(`🔹 Uploaded Files: ${JSON.stringify(files, null, 2)}`);

    // Log marker image
    console.log('🔹 Marker Image:', files.marker);
    this.logToFile(`🔹 Marker Image: ${JSON.stringify(files.marker, null, 2)}`);

    // Extract fields
    let marker: Express.Multer.File | { buffer: Buffer; mimetype: string; originalname: string } | undefined = files.marker?.[0];

    // Validate inputs
    if (!marker) {
      console.log('❌ Error: No marker image uploaded');
      this.logToFile('❌ Error: No marker image uploaded');
      throw new BadRequestException('No marker image uploaded');
    }

    if (!files.files || files.files.length === 0) {
      console.log('❌ Error: No post files uploaded');
      this.logToFile('❌ Error: No post files uploaded');
      throw new BadRequestException('No post files uploaded');
    }

    this.logToFile('✅ Success: Request processed successfully');
    return 'Success ✅✅';
  }

  private logToFile(message: string) {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', // e.g., Thursday
      month: 'long', // e.g., March
      day: 'numeric', // e.g., 5
      hour: 'numeric', // e.g., 12
      minute: '2-digit', // e.g., 30
      hour12: true, // Use 12-hour format with AM/PM
    };

    const formattedTimestamp = now.toLocaleString('en-US', options); // e.g., Thursday, March 5, 12:30 PM

    fs.appendFileSync(this.logFilePath, `[${formattedTimestamp}] ${message}\n`, 'utf8');
  }


}