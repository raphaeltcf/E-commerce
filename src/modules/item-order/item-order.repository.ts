import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateItemOrderDto } from './interfaces/dto/create-item-order.dto';
import { UpdateItemOrderDto } from './interfaces/dto/update-item-order.dto';
import { IItemOrder } from './interfaces/item-order.inteface';

@Injectable()
export class ItemOrderRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateItemOrderDto): Promise<IItemOrder> {
    try {
      return await this.prisma.itemOrder.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<IItemOrder[]> {
    try {
      return await this.prisma.itemOrder.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findByOrderId(orderId: string): Promise<IItemOrder[]> {
    try {
      return await this.prisma.itemOrder.findMany({
        where: { orderId },
        include: { product: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<IItemOrder> {
    try {
      return await this.prisma.itemOrder.findUnique({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateItemOrderDto: UpdateItemOrderDto,
  ): Promise<IItemOrder> {
    try {
      return await this.prisma.itemOrder.update({
        where: { id },
        data: updateItemOrderDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<IItemOrder> {
    try {
      return await this.prisma.itemOrder.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
