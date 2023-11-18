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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ROLE } from '@prisma/client';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
=======
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
<<<<<<< HEAD
  @Roles(ROLE.ADMIN)
=======
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

<<<<<<< HEAD
  @Get('')
  @Roles(ROLE.ADMIN)
=======
  @Get()
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
<<<<<<< HEAD
  @Roles(ROLE.ADMIN)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
=======
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  }
}
