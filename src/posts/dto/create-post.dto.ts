import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import e from 'express';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  postText: string;

  @IsNotEmpty()
  @IsString()
  latitude: string;

  @IsNotEmpty()
  @IsString()
  longitude: string;

  @IsOptional()
  @IsString()
  locationName?: string;

  @IsNotEmpty()
  @IsString()
  markerImage: string;

}
