import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
<<<<<<< HEAD
import { EmailService } from 'src/email/email.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, EmailService],
=======

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  exports: [UsersService],
})
export class UsersModule {}
