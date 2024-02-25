import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CustomersService } from 'src/modules/customers/customers.service';
import { UsersService } from 'src/modules/users/users.service';
import { EmailService } from 'src/modules/email/email.service';
import { CustomersRepository } from '../customers/customers.repository';
import { UsersRepository } from '../users/users.repository';
import { OrderRepository } from './order.repository';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    CustomersRepository,
    CustomersService,
    PrismaService,
    UsersService,
    UsersRepository,
    EmailService,
  ],
})
export class OrderModule {}
