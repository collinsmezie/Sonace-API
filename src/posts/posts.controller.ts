import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('new')
  @UseInterceptors(FilesInterceptor('files', 4)) // Allows up to 4 files
  async create(
    @UploadedFiles() files: Express.Multer.File[], // Handle multiple files
    @Body() createPostDto: CreatePostDto,
  ) {
    const { title, description, userId, latitude, longitude, locationName } = createPostDto;

    const result = await this.postsService.uploadPosts(
      files, // Now an array
      userId,
      title,
      latitude.toString(),
      longitude.toString(),
      locationName,
      description,
    );

    return result;
  }
}





// import {
//   Controller,
//   Post,
//   Body,
//   Param,
//   UseInterceptors,
//   UploadedFile,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { PostsService } from './posts.service';
// import { CreatePostDto } from './dto/create-post.dto';

// @Controller('posts')
// export class PostsController {
//   constructor(private readonly postsService: PostsService) { }

//   @Post('new')
//   @UseInterceptors(FileInterceptor('file')) // Expecting a file upload
//   async create(
//     @UploadedFile() file: Express.Multer.File,
//     @Body() createPostDto: CreatePostDto,
//   ) {

//     const { title, description, userId, latitude, longitude, locationName } = createPostDto;

//     const result = await this.postsService.uploadPost(
//       file,
//       userId,
//       title,
//       latitude.toString(),
//       longitude.toString(),
//       locationName,
//       description,
//     );

//     return result;
//   }
// }
