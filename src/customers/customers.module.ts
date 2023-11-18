import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
<<<<<<< HEAD
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, UsersService, PrismaService, EmailService],
=======

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
})
export class CustomersModule {}
