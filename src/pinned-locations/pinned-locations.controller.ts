import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PinnedLocationsService } from './pinned-locations.service';
import { CreatePinnedLocationDto } from './dto/create-pinned-location.dto';
import { UpdatePinnedLocationDto } from './dto/update-pinned-location.dto';

@Controller('pinned-locations')
export class PinnedLocationsController {
  constructor(private readonly pinnedLocationsService: PinnedLocationsService) {}

  @Post()
  create(@Body() createPinnedLocationDto: CreatePinnedLocationDto) {
    return this.pinnedLocationsService.create(createPinnedLocationDto);
  }

  @Get()
  findAll() {
    return this.pinnedLocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pinnedLocationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePinnedLocationDto: UpdatePinnedLocationDto) {
    return this.pinnedLocationsService.update(+id, updatePinnedLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pinnedLocationsService.remove(+id);
  }
}
