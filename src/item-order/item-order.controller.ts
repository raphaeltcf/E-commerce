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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Item Order')
@ApiBearerAuth('token')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@Controller('item-order')
export class ItemOrderController {
  constructor(private readonly itemOrderService: ItemOrderService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemOrderService.findOne(id);
  }

  @Post('')
  create(@Body() createItemOrderDto: CreateItemOrderDto) {
    return this.itemOrderService.create(createItemOrderDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemOrderDto: UpdateItemOrderDto,
  ) {
    return this.itemOrderService.update(id, updateItemOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemOrderService.remove(id);
  }
}
