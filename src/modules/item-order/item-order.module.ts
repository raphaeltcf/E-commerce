import { Module } from '@nestjs/common';
import { ItemOrderService } from './item-order.service';
import { ItemOrderController } from './item-order.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { OrderService } from 'src/modules/order/order.service';
import { ProductService } from 'src/modules/product/product.service';
import { CustomersService } from 'src/modules/customers/customers.service';
import { UsersService } from 'src/modules/users/users.service';
import { EmailService } from 'src/modules/email/email.service';
import { CustomersRepository } from '../customers/customers.repository';
import { UsersRepository } from '../users/users.repository';
import { ItemOrderRepository } from './item-order.repository';
import { OrderRepository } from '../order/order.repository';
import { ProductRepository } from '../product/product.repository';

@Module({
  controllers: [ItemOrderController],
  providers: [
    OrderService,
    OrderRepository,
    ItemOrderService,
    ItemOrderRepository,
    ProductService,
    ProductRepository,
    PrismaService,
    CustomersRepository,
    CustomersService,
    UsersService,
    UsersRepository,
    EmailService,
  ],
})
export class ItemOrderModule {}
