import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: CreateUserDto & import("../users/entities/user.entity").User;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        access_token: string;
    }>;
}
