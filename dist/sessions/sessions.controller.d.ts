import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
export declare class SessionsController {
    private readonly sessionsService;
    constructor(sessionsService: SessionsService);
    create(createSessionDto: CreateSessionDto): void;
    findAll(): Promise<any[]>;
    findOne(id: string): any;
    update(id: string, updateSessionDto: UpdateSessionDto): any;
    remove(id: string): any;
}
