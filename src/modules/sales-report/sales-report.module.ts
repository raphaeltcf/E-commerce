import { Module } from '@nestjs/common';
import { SalesReportService } from './sales-report.service';
import { SalesReportController } from './sales-report.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { TransactionsService } from 'src/modules/transactions/transactions.service';
import { OrderService } from 'src/modules/order/order.service';
import { CustomersService } from 'src/modules/customers/customers.service';
import { UsersService } from 'src/modules/users/users.service';
import { EmailService } from 'src/modules/email/email.service';
import { ItemOrderService } from 'src/modules/item-order/item-order.service';
import { ProductService } from 'src/modules/product/product.service';
import { AwsService } from 'src/modules/aws/aws.service';
import { CustomersRepository } from '../customers/customers.repository';
import { UsersRepository } from '../users/users.repository';
import { TransactionsRepository } from '../transactions/transactions.repository';
import { SalesReportRepository } from './sales-report.repository';
import { ItemOrderRepository } from '../item-order/item-order.repository';
import { ProductRepository } from '../product/product.repository';
import { OrderRepository } from '../order/order.repository';

@Module({
  controllers: [SalesReportController],
  providers: [
    SalesReportService,
    SalesReportRepository,
    PrismaService,
    TransactionsService,
    TransactionsRepository,
    ItemOrderService,
    ItemOrderRepository,
    ProductService,
    ProductRepository,
    OrderService,
    OrderRepository,
    CustomersRepository,
    CustomersService,
    UsersService,
    UsersRepository,
    EmailService,
    AwsService,
  ],
})
export class SalesReportModule {}
