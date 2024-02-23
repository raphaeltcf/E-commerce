import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderService } from 'src/modules/order/order.service';
import { CustomersService } from 'src/modules/customers/customers.service';
import { UsersService } from 'src/modules/users/users.service';
import { EmailService } from 'src/modules/email/email.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    PrismaService,
    OrderService,
    CustomersService,
    UsersService,
    EmailService,
  ],
})
export class TransactionsModule {}
