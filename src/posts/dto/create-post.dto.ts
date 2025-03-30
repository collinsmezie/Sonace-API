import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

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
