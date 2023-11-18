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
import { ItemOrderService } from './item-order.service';
import { CreateItemOrderDto } from './dto/create-item-order.dto';
import { UpdateItemOrderDto } from './dto/update-item-order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Item Order')
=======
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemOrderService } from './item-order.service';
import { CreateItemOrderDto } from './dto/create-item-order.dto';
import { UpdateItemOrderDto } from './dto/update-item-order.dto';

>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
@Controller('item-order')
export class ItemOrderController {
  constructor(private readonly itemOrderService: ItemOrderService) {}

<<<<<<< HEAD
  @Post('')
=======
  @Post()
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  create(@Body() createItemOrderDto: CreateItemOrderDto) {
    return this.itemOrderService.create(createItemOrderDto);
  }

<<<<<<< HEAD
  @Get('')
=======
  @Get()
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  findAll() {
    return this.itemOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
<<<<<<< HEAD
    return this.itemOrderService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemOrderDto: UpdateItemOrderDto,
  ) {
    return this.itemOrderService.update(id, updateItemOrderDto);
=======
    return this.itemOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemOrderDto: UpdateItemOrderDto) {
    return this.itemOrderService.update(+id, updateItemOrderDto);
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
<<<<<<< HEAD
    return this.itemOrderService.remove(id);
=======
    return this.itemOrderService.remove(+id);
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  }
}
