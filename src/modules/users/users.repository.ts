import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDto } from './interfaces/dto/create-user.dto';
import { prismaExclude } from 'src/core/utils/prisma-exclude';
import { UpdateUserDto } from './interfaces/dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import { IUserWithPassword } from './interfaces/user-with-pass.interface';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<IUser> {
    try {
      const createdUser = await this.prisma.user.create({
        data,
      });

      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<IUser[]> {
    try {
      return await this.prisma.user.findMany({
        select: prismaExclude('User', ['password']),
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string): Promise<IUser> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id,
        },
        select: prismaExclude('User', ['password']),
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<IUserWithPassword> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<IUser> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<IUser> {
    try {
      return await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
