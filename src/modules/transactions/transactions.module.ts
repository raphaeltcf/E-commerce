import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { OrderService } from 'src/modules/order/order.service';
import { CustomersService } from 'src/modules/customers/customers.service';
import { UsersService } from 'src/modules/users/users.service';
import { EmailService } from 'src/modules/email/email.service';
import { CustomersRepository } from '../customers/customers.repository';
import { UsersRepository } from '../users/users.repository';
import { TransactionsRepository } from './transactions.repository';
import { OrderRepository } from '../order/order.repository';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionsRepository,
    PrismaService,
    OrderService,
    OrderRepository,
    CustomersRepository,
    CustomersService,
    UsersService,
    UsersRepository,
    EmailService,
  ],
})
export class TransactionsModule {}
