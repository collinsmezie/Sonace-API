import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: CreateUserDto & import("../users/entities/user.entity").User;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        access_token: string;
    }>;
}
