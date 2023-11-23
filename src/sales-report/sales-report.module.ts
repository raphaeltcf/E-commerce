import { Module } from '@nestjs/common';
import { SalesReportService } from './sales-report.service';
import { SalesReportController } from './sales-report.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { OrderService } from 'src/order/order.service';
import { CustomersService } from 'src/customers/customers.service';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email/email.service';
import { ItemOrderService } from 'src/item-order/item-order.service';
import { ProductService } from 'src/product/product.service';
import { AwsService } from 'src/aws/aws.service';

@Module({
  controllers: [SalesReportController],
  providers: [
    SalesReportService,
    PrismaService,
    TransactionsService,
    ItemOrderService,
    ProductService,
    OrderService,
    CustomersService,
    UsersService,
    EmailService,
    AwsService,
  ],
})
export class SalesReportModule {}
