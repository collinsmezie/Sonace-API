import { Injectable } from '@nestjs/common';
import { CreatePinnedLocationDto } from './dto/create-pinned-location.dto';
import { UpdatePinnedLocationDto } from './dto/update-pinned-location.dto';

@Injectable()
export class PinnedLocationsService {
  create(createPinnedLocationDto: CreatePinnedLocationDto) {
    return 'This action adds a new pinnedLocation';
  }

  findAll() {
    return `This action returns all pinnedLocations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pinnedLocation`;
  }

  update(id: number, updatePinnedLocationDto: UpdatePinnedLocationDto) {
    return `This action updates a #${id} pinnedLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} pinnedLocation`;
  }
}
