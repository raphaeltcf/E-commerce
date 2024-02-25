import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateOrderDto } from './interfaces/dto/create-order.dto';
import { UpdateOrderDto } from './interfaces/dto/update-order.dto';
import { FilterOrderDTO } from './interfaces/dto/filter-order.dto';
import { parseDateStringToISO } from 'src/core/utils/parse-date';
import { IOrder } from './interfaces/order.interface';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateOrderDto): Promise<IOrder> {
    try {
      return await this.prisma.order.create({ data });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<IOrder> {
    try {
      return await this.prisma.order.findUnique({
        where: { id },
        include: { itemOrder: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(filters: FilterOrderDTO): Promise<IOrder[]> {
    try {
      return await this.prisma.order.findMany({
        where: {
          status: filters.status || undefined,
          total: {
            gte: Number(filters.minPrice) || undefined,
            lte: Number(filters.maxPrice) || undefined,
          },
          createdAt: {
            gte:
              (filters.minDate && parseDateStringToISO(filters.minDate)) ||
              undefined,
            lte:
              (filters.maxDate &&
                parseDateStringToISO(filters.maxDate, true)) ||
              undefined,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: UpdateOrderDto): Promise<IOrder> {
    try {
      return await this.prisma.order.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateTotal(id: string, price: number): Promise<IOrder> {
    try {
      return this.prisma.order.update({
        where: { id },
        data: { total: { increment: price } },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<IOrder> {
    try {
      return await this.prisma.order.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
