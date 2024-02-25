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
import { CreateItemOrderDto } from './interfaces/dto/create-item-order.dto';
import { UpdateItemOrderDto } from './interfaces/dto/update-item-order.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Item Order')
@ApiBearerAuth('token')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@Controller('item-order')
export class ItemOrderController {
  constructor(private readonly itemOrderService: ItemOrderService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.itemOrderService.findOne(id);
  }

  @Post('')
  async create(@Body() createItemOrderDto: CreateItemOrderDto) {
    return await this.itemOrderService.create(createItemOrderDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateItemOrderDto: UpdateItemOrderDto,
  ) {
    return await this.itemOrderService.update(id, updateItemOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.itemOrderService.remove(id);
  }
}
