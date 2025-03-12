import { Test, TestingModule } from '@nestjs/testing';
import { PinnedLocationsController } from './pinned-locations.controller';
import { PinnedLocationsService } from './pinned-locations.service';

describe('PinnedLocationsController', () => {
  let controller: PinnedLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PinnedLocationsController],
      providers: [PinnedLocationsService],
    }).compile();

    controller = module.get<PinnedLocationsController>(PinnedLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
