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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ROLE } from '@prisma/client';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterProductsDTO } from './dto/filter-products.dto';

@ApiTags('Product')
@ApiBearerAuth('token')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(ROLE.ADMIN)
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('')
  findAll(@Query() filters: FilterProductsDTO) {
    return this.productService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN)
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
