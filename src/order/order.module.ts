import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomersService } from 'src/customers/customers.service';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email/email.service';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    CustomersService,
    PrismaService,
    UsersService,
    EmailService,
  ],
})
export class OrderModule {}
