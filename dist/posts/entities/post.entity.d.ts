import { User } from 'src/users/entities/user.entity';
import { PinnedLocation } from 'src/pinned-locations/entities/pinned-location.entity';
export declare class Post {
    id: string;
    title: string;
    description: string;
    media_url: string;
    created_at: Date;
    user: User;
    location: PinnedLocation;
}
