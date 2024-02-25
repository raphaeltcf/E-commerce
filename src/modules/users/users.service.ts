import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './interfaces/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { EmailService } from 'src/modules/email/email.service';
import { welcomeMessage } from 'src/core/utils/templates';
import { UpdateUserDto } from './interfaces/dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { IUser } from './interfaces/user.interface';
import { IUserWithPassword } from './interfaces/user-with-pass.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly emailService: EmailService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      const data: Prisma.UserCreateInput = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      };

      const createdUser = await this.usersRepository.create(data);

      await this.emailService.sendMail({
        email: createUserDto.email,
        title: 'Bem Vindo a LoomiStore',
        body: welcomeMessage(createUserDto.name),
      });
      return createdUser;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
    }
  }

  async findByEmail(email: string): Promise<IUserWithPassword> {
    return await this.usersRepository.findOneByEmail(email);
  }

  async findAll(): Promise<IUser[]> {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<IUser> {
    try {
      const user = await this.usersRepository.findOneById(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error with User ID`);
      }
    }
  }
  async update(id: string, data: UpdateUserDto): Promise<IUser> {
    try {
      const existingUser = await this.usersRepository.findOneById(id);
      if (!existingUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return this.usersRepository.update(id, data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error updating User`);
      }
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const user = await this.usersRepository.findOneById(id);

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      await this.usersRepository.remove(id);

      return { message: 'User deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error deleting User`);
      }
    }
  }
}
