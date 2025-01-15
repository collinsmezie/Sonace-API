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
    const user = new User();

    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return this.usersRepository.save(user);
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
    // await this.usersRepository.update(id, updateUserDto);
    // return this.usersRepository.findOneBy({ id });

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

    if (deleteResult.affected === 0) {
      // In case deleteResult.affected is 0 (meaning nothing was deleted)
      throw new NotFoundException(`User not found - Provide a valid id`);
    }

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
