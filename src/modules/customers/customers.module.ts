import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { UsersService } from 'src/modules/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/modules/email/email.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, UsersService, PrismaService, EmailService],
})
export class CustomersModule {}
