import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
export declare class SessionsService {
    private sessions;
    getSessions(): any[];
    getSession(id: number): any;
    createSession(createSessionDto: CreateSessionDto): {
        id: number;
        sessionName: string;
        contributionAmount: number;
        duration: string;
    };
    updateSession(id: number, updateSessionDto: UpdateSessionDto): any;
    removeSession(id: number): any;
}
