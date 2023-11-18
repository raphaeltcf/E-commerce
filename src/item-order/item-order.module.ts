import { Module } from '@nestjs/common';
import { ItemOrderService } from './item-order.service';
import { ItemOrderController } from './item-order.controller';
<<<<<<< HEAD
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ItemOrderController],
  providers: [ItemOrderService, PrismaService],
=======

@Module({
  controllers: [ItemOrderController],
  providers: [ItemOrderService],
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
})
export class ItemOrderModule {}
