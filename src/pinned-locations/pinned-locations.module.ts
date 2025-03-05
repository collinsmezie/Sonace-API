import { Module } from '@nestjs/common';
import { PinnedLocationsService } from './pinned-locations.service';
import { PinnedLocationsController } from './pinned-locations.controller';

@Module({
  controllers: [PinnedLocationsController],
  providers: [PinnedLocationsService],
})
export class PinnedLocationsModule {}
