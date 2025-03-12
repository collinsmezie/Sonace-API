import {
  Controller,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post('new')
  @UseInterceptors(FileInterceptor('file')) // Expecting a file upload
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
  ) {

    const { title, description, userId, latitude, longitude, locationName } = createPostDto;

    const result = await this.postsService.uploadPost(
      file,
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
