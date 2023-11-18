import { Injectable } from '@nestjs/common';
import { CreateItemOrderDto } from './dto/create-item-order.dto';
import { UpdateItemOrderDto } from './dto/update-item-order.dto';
<<<<<<< HEAD
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
=======

@Injectable()
export class ItemOrderService {
  create(createItemOrderDto: CreateItemOrderDto) {
    return 'This action adds a new itemOrder';
  }

  findAll() {
    return `This action returns all itemOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemOrder`;
  }

  update(id: number, updateItemOrderDto: UpdateItemOrderDto) {
    return `This action updates a #${id} itemOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemOrder`;
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  }
}
