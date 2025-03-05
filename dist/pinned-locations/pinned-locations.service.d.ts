import { CreatePinnedLocationDto } from './dto/create-pinned-location.dto';
import { UpdatePinnedLocationDto } from './dto/update-pinned-location.dto';
export declare class PinnedLocationsService {
    create(createPinnedLocationDto: CreatePinnedLocationDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePinnedLocationDto: UpdatePinnedLocationDto): string;
    remove(id: number): string;
}
