import { PinnedLocationsService } from './pinned-locations.service';
import { CreatePinnedLocationDto } from './dto/create-pinned-location.dto';
import { UpdatePinnedLocationDto } from './dto/update-pinned-location.dto';
export declare class PinnedLocationsController {
    private readonly pinnedLocationsService;
    constructor(pinnedLocationsService: PinnedLocationsService);
    create(createPinnedLocationDto: CreatePinnedLocationDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePinnedLocationDto: UpdatePinnedLocationDto): string;
    remove(id: string): string;
}
