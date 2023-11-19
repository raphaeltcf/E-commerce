import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterOrderDTO } from './dto/filter-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateOrderDto) {
    return this.prisma.order.create({ data });
  }

  findAll(filters: FilterOrderDTO) {
    return this.prisma.order.findMany({
      where: {
        status: filters.status || undefined,
        total: {
          gte: Number(filters.minPrice) || undefined,
          lte: Number(filters.maxPrice) || undefined,
        },
        createdAt: {
          gte: filters.minDate || undefined,
          lte: filters.maxDate || undefined,
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { itemOrder: true },
    });
  }

  update(id: string, data: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data,
    });
  }

  updateTotal(id: string, price: number) {
    return this.prisma.order.update({
      where: { id },
      data: { total: { increment: price } },
    });
  }

  remove(id: string) {
    return this.prisma.order.delete({ where: { id } });
  }
}
