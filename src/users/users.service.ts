import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { s3 } from '../config/s3.config';

@Injectable()
export class UsersService {
  private readonly bucketName = process.env.AWS_S3_BUCKET_NAME;
  private readonly region = process.env.AWS_REGION;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
    file?: Express.Multer.File
  ): Promise<{ message: string; updatedUser: User; profileImageUrl: string }> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User not found - Provide a valid ID`);
    }

    let profileImageUrl: string = null
  
    // If a file is uploaded, update profile image
    if (file) {
      if (user.profileImage) {
        await this.deleteFromS3(user.profileImage);
      }
  
      const key = `profile-images/${uuidv4()}-${file.originalname}`;
      profileImageUrl = await this.uploadToS3(file, key);
      
      // Add profile image to the update data
      updateUserDto = { ...updateUserDto, profileImage: key };
    }
  
    await this.usersRepository.update(userId, updateUserDto);
    const updatedUser = await this.usersRepository.findOneBy({ id: userId });
  
    return {
      message: 'User updated successfully',
      updatedUser,
      profileImageUrl
    };
  }
   

  private async uploadToS3(file: Express.Multer.File, key: string): Promise<string> {
    try {
      const uploadParams: PutObjectCommandInput = {
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      await s3.send(new PutObjectCommand(uploadParams));

      // Return the full URL
      return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
    } catch (error) {
      console.error('Error uploading profile image to S3:', error);
      throw new InternalServerErrorException('Failed to upload profile image. Please try again later.');
    }
  }

  private async deleteFromS3(key: string): Promise<void> {
    try {
      await s3.send(new DeleteObjectCommand({ Bucket: this.bucketName, Key: key }));
    } catch (error) {
      console.error('Error deleting old profile image from S3:', error);
      throw new InternalServerErrorException('Failed to delete old profile image.');
    }
  }


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
