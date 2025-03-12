import { Test, TestingModule } from '@nestjs/testing';
import { PinnedLocationsService } from './pinned-locations.service';

describe('PinnedLocationsService', () => {
  let service: PinnedLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PinnedLocationsService],
    }).compile();

    service = module.get<PinnedLocationsService>(PinnedLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
