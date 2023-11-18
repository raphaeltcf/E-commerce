import { Module } from '@nestjs/common';
import { ItemOrderService } from './item-order.service';
import { ItemOrderController } from './item-order.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ItemOrderController],
  providers: [ItemOrderService, PrismaService],
})
export class ItemOrderModule {}
