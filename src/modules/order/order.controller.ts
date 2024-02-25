import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './interfaces/dto/create-order.dto';
import { UpdateOrderDto } from './interfaces/dto/update-order.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterOrderDTO } from './interfaces/dto/filter-order.dto';
import { ROLE } from '@prisma/client';
import { Roles } from 'src/core/decorators/roles.decorator';
import { UpdateStatusDto } from './interfaces/dto/update-status.dto';

@ApiTags('Order')
@ApiBearerAuth('token')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Get()
  async findAll(@Query() filters: FilterOrderDTO) {
    return await this.orderService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(id, updateOrderDto);
  }

  @Patch('status/:id')
  @Roles(ROLE.ADMIN)
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() data: UpdateStatusDto,
  ) {
    return await this.orderService.updateStatus(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id);
  }
}
