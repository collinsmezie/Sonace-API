import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
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

  @IsOptional()
  @IsString()
  textBackgroundColor?: string;

  @IsOptional()
  @IsString()
  postType?: string;

}
