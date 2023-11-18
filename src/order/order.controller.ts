<<<<<<< HEAD
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ROLE } from '@prisma/client';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
=======
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
<<<<<<< HEAD
  @Roles(ROLE.CUSTOMER)
=======
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
<<<<<<< HEAD
  @Roles(ROLE.CUSTOMER)
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @Roles(ROLE.CUSTOMER)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @Roles(ROLE.CUSTOMER)
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
=======
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  }
}
