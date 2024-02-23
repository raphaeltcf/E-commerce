import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomersService } from 'src/modules/customers/customers.service';
import { UsersService } from 'src/modules/users/users.service';
import { EmailService } from 'src/modules/email/email.service';

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
