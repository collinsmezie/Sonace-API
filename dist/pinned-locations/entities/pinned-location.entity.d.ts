import { User } from 'src/users/entities/user.entity';
export declare class PinnedLocation {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    created_at: Date;
    created_by: User;
}
