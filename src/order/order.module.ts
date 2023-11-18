import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
<<<<<<< HEAD
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
=======

@Module({
  controllers: [OrderController],
  providers: [OrderService],
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
})
export class OrderModule {}
