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
import { CustomersService } from './customers.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerUserDto } from './dto/create-customer-user.dto';
import { UsersService } from 'src/users/users.service';
import { IsPublic } from 'src/auth/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly userService: UsersService,
  ) {}

  @Post('')
  @IsPublic()
  async create(@Body() createCustomerUser: CreateCustomerUserDto) {
    const { email, password, fullName, ...rest } = createCustomerUser;
    const user = await this.userService.create({
      name: fullName,
      email,
      password,
      type: 'CUSTOMER',
    });

    if (user) {
      return this.customersService.create({
        ...rest,
        fullName,
        userId: user.id,
        status: true,
      });
    }
  }

  @Get('')
=======
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
<<<<<<< HEAD
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
=======
    return this.customersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(+id, updateCustomerDto);
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
<<<<<<< HEAD
    return this.customersService.remove(id);
=======
    return this.customersService.remove(+id);
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  }
}
