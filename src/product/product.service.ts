import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterProductsDTO } from './dto/filter-products.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  findAll(filters: FilterProductsDTO) {
    return this.prisma.product.findMany({
      where: {
        name: { contains: filters.name, mode: 'insensitive' } || undefined,
        price: {
          gte: Number(filters.minPrice) || undefined,
          lte: Number(filters.maxPrice) || undefined,
        },
        stockQuantity: {
          gte: Number(filters.minStockQuantity) || undefined,
          lte: Number(filters.maxStockQuantity) || undefined,
        },
        category: { contains: filters.name, mode: 'insensitive' } || undefined,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
