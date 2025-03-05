import { PinnedLocation } from '../../pinned-locations/entities/pinned-location.entity';
import { Post } from '../../posts/entities/post.entity';
export declare class User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    pinnedLocations: PinnedLocation[];
    posts: Post[];
}
