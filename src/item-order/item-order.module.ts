import { Module } from '@nestjs/common';
import { ItemOrderService } from './item-order.service';
import { ItemOrderController } from './item-order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';

@Module({
  controllers: [ItemOrderController],
  providers: [OrderService, ItemOrderService, ProductService, PrismaService],
})
export class ItemOrderModule {}
