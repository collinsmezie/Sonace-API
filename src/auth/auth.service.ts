import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    
    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      return { message: 'Invalid password' };
    }
  
    // Return user data excluding password
    const { password, ...result } = user;
    return result;
  }
  

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return { message: 'User registered successfully', user };
  }


  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
  
    // Check if validateUser returned a message (error response)
    if (user?.message) {
      throw new BadRequestException(user.message);
    }
  
    console.log("Logged In User", user.username);
  
    const payload = { email: user.email, sub: user.id };
    return {
      message: 'User logged in successfully',
      access_token: this.jwtService.sign(payload),
    };
  }
  
}
