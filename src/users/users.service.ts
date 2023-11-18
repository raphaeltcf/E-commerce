import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
<<<<<<< HEAD
import { EmailService } from 'src/email/email.service';
import { welcomeMessage } from 'src/email/templates';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}
=======

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e

  async create(createUserDto: CreateUserDto) {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
<<<<<<< HEAD
      type: 'CUSTOMER',
    };

    const createdUser = await this.prisma.user.create({ data });
    await this.emailService.sendMail({
      email: createUserDto.email,
      title: 'Bem Vindo a LoomiStore',
      body: welcomeMessage(createUserDto.name),
    });
=======
    };

    const createdUser = await this.prisma.user.create({ data });

>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
    return { ...createdUser, password: undefined };
  }

  async findByEmail(email: string) {
<<<<<<< HEAD
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id: String(id) } });
  }

  async update(id: string, user: Prisma.UserCreateInput) {
    return await this.prisma.user.update({
      where: { id: String(id) },
      data: {
        name: user.name,
        email: user.email,
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id: String(id) } });
=======
    return this.prisma.user.findUnique({ where: { email: email } });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  }
}
