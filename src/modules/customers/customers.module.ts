import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { UsersService } from 'src/modules/users/users.service';
import { EmailService } from 'src/modules/email/email.service';
import { CustomersRepository } from './customers.repository';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersRepository } from '../users/users.repository';

@Module({
  controllers: [CustomersController],
  providers: [
    CustomersService,
    UsersService,
    UsersRepository,
    EmailService,
    CustomersRepository,
    PrismaService,
  ],
})
export class CustomersModule {}
