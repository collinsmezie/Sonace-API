import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {

    // Check if the user exists in the database
    const user = await this.usersRepository.findOne({ where: { email: createUserDto.email } });

    if (user) {
      // If user is found, throw a BadRequestException
      throw new NotFoundException(`User with this email already exists - Provide a unique email`);
    }

    // Proceed with user creation
    return this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }


  // findOne handler for login use
  async findOne(email: string): Promise<User> {

    // Check if the user exists in the database
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      // If no user is found, throw a NotFoundException
      throw new NotFoundException(`User not found - Provide a valid or registered email`);
    }

    return user;
  }

  // findOne handler for user retrieval
  async findOneBy(id: string): Promise<User> {
    // return this.usersRepository.findOne({ where: { id } });

    // Check if the user exists in the database
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      // If no user is found, throw a NotFoundException
      throw new NotFoundException(`User not found - Provide a valid id`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {

    // Check if the user exists in the database
    const user = await this.usersRepository.findOne({ where: { id } }); 

    if (!user) {
      // If no user is found, throw a NotFoundException
      throw new NotFoundException(`User not found - Provide a valid id`);
    }

    // Proceed with update
    await this.usersRepository.update(id, updateUserDto);

    // Return the updated user
    return this.usersRepository.findOneBy({ id });

  }

  async remove(id: string): Promise<void> {
    // Check if the user exists in the database
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      // If no user is found, throw a NotFoundException
      throw new NotFoundException(`User not found - Provide a valid id`);
    }

    // Proceed with deletion
    const deleteResult = await this.usersRepository.delete(id);

    return;
  }
}















// import { Injectable } from '@nestjs/common';

// // This should be a real class/interface representing a user entity
// export type User = any;

// @Injectable()
// export class UsersService {
//   private readonly users = [
//     {
//       userId: 1,
//       username: 'john',
//       password: 'changeme',
//     },
//     {
//       userId: 2,
//       username: 'maria',
//       password: 'guess',
//     },
//   ];

//   async findOne(username: string): Promise<User | undefined> {
//     return this.users.find(user => user.username === username);
//   }
// }
