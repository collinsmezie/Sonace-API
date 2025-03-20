import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post('new')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'files', maxCount: 5 }, // Post files
        { name: 'markerImage', maxCount: 1 }, // Marker image
      ],
      { limits: { fileSize: 50 * 1024 * 1024 } },
    ),
  )
  async create(
    @UploadedFiles()
    files: { files?: Express.Multer.File[]; markerImage?: Express.Multer.File[] },
    @Body() createPostDto: CreatePostDto,
  ) {
    const { userId, postText, latitude, longitude, locationName } = createPostDto;

    if (!files.markerImage || files.markerImage.length === 0) {
      throw new BadRequestException('No marker image uploaded');
    }

    if (!files.files || files.files.length === 0) {
      throw new BadRequestException('No posts uploaded');
    }

    const result = await this.postsService.uploadPosts(
      files.files, // Post files
      userId,
      postText,
      latitude.toString(),
      longitude.toString(),
      locationName,
      files.markerImage[0], // Marker image (single file)
    );

    return result;
  }
}

















// import {
//   Controller,
//   Post,
//   Body,
//   UseInterceptors,
//   UploadedFiles,
// } from '@nestjs/common';
// import { FilesInterceptor } from '@nestjs/platform-express';
// import { PostsService } from './posts.service';
// import { CreatePostDto } from './dto/create-post.dto';

// @Controller('posts')
// export class PostsController {
//   constructor(private readonly postsService: PostsService) {}

//   @Post('new')
//   @UseInterceptors(FilesInterceptor('files', 5, { limits: { fileSize: 50 * 1024 * 1024 } })) // Allows up to 5 files and videos up to 50MB
//   async create(
//     @UploadedFiles() files: Express.Multer.File[], // Handle multiple files
//     @Body() createPostDto: CreatePostDto,
//   ) {
//     const { text, userId, latitude, longitude, locationName } = createPostDto;

//     const result = await this.postsService.uploadPosts(
//       files, // Now an array
//       userId,
//       text,
//       latitude.toString(),
//       longitude.toString(),
//       locationName,
//     );

//     return result;
//   }
// }
