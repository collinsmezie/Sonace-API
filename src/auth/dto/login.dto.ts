import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class LoginDto {

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}
