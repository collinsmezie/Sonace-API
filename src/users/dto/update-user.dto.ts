import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    
    id: string;
    @IsNotEmpty({ message: 'Username cannot be empty' })
    username: string;
    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
    @IsNotEmpty({ message: 'Password cannot be empty' })
    @MinLength(6, { message: 'Password should be at least 6 characters' })
    password: string;
}
