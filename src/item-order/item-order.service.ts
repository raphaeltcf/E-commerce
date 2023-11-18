import { Injectable } from '@nestjs/common';
import { CreateItemOrderDto } from './dto/create-item-order.dto';
import { UpdateItemOrderDto } from './dto/update-item-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemOrderService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateItemOrderDto) {
    return this.prisma.itemOrder.create({ data });
  }

  findAll() {
    return this.prisma.itemOrder.findMany();
  }

  findOne(id: string) {
    return this.prisma.itemOrder.findUnique({ where: { id } });
  }

  update(id: string, updateItemOrderDto: UpdateItemOrderDto) {
    return this.prisma.itemOrder.update({
      where: { id },
      data: updateItemOrderDto,
    });
  }

  remove(id: string) {
    return this.prisma.itemOrder.delete({ where: { id } });
  }
}
