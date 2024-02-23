import { Module } from '@nestjs/common';
import { SalesReportService } from './sales-report.service';
import { SalesReportController } from './sales-report.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionsService } from 'src/modules/transactions/transactions.service';
import { OrderService } from 'src/modules/order/order.service';
import { CustomersService } from 'src/modules/customers/customers.service';
import { UsersService } from 'src/modules/users/users.service';
import { EmailService } from 'src/modules/email/email.service';
import { ItemOrderService } from 'src/modules/item-order/item-order.service';
import { ProductService } from 'src/modules/product/product.service';
import { AwsService } from 'src/modules/aws/aws.service';

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
