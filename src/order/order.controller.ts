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
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterOrderDTO } from './dto/filter-order.dto';
import { ROLE } from '@prisma/client';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { UpdateStatusDto } from './dto/update-status.dto';

@ApiTags('Order')
@ApiBearerAuth('token')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll(@Query() filters: FilterOrderDTO) {
    return this.orderService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Patch('status/:id')
  @Roles(ROLE.ADMIN)
  updateOrderStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    console.log(id);
    return this.orderService.update(id, { status: updateStatusDto.status });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
