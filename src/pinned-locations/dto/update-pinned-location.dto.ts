import { PartialType } from '@nestjs/mapped-types';
import { CreatePinnedLocationDto } from './create-pinned-location.dto';

export class UpdatePinnedLocationDto extends PartialType(CreatePinnedLocationDto) {}
