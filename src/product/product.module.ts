import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
<<<<<<< HEAD
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
=======

@Module({
  controllers: [ProductController],
  providers: [ProductService],
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
})
export class ProductModule {}
