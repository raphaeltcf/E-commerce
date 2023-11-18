<<<<<<< HEAD
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IsPublic } from 'src/auth/decorators/public.decorator';
import { Prisma, ROLE } from '@prisma/client';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
=======
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
<<<<<<< HEAD
  @Roles(ROLE.ADMIN)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @IsPublic()
  @Get('')
=======
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
<<<<<<< HEAD
    return this.usersService.findOne(id);
  }

  @IsPublic()
  @Get('find/:email')
=======
    return this.usersService.findOne(+id);
  }

  @Get(':email')
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

<<<<<<< HEAD
  @Put(':id')
  async update(@Param('id') id: string, @Body() user: Prisma.UserCreateInput) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
=======
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  }
}
