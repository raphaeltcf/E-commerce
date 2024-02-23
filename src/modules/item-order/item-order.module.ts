import { Module } from '@nestjs/common';
import { ItemOrderService } from './item-order.service';
import { ItemOrderController } from './item-order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderService } from 'src/modules/order/order.service';
import { ProductService } from 'src/modules/product/product.service';
import { CustomersService } from 'src/modules/customers/customers.service';
import { UsersService } from 'src/modules/users/users.service';
import { EmailService } from 'src/modules/email/email.service';

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
