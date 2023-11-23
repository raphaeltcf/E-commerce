import { Module } from '@nestjs/common';
import { ItemOrderService } from './item-order.service';
import { ItemOrderController } from './item-order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { CustomersService } from 'src/customers/customers.service';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email/email.service';

@Module({
  controllers: [ItemOrderController],
  providers: [
    OrderService,
    ItemOrderService,
    ProductService,
    PrismaService,
    CustomersService,
    UsersService,
    EmailService,
  ],
})
export class ItemOrderModule {}
