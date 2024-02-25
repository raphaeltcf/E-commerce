import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateProductDto } from './interfaces/dto/create-product.dto';
import { FilterProductsDTO } from './interfaces/dto/filter-products.dto';
import { UpdateProductDto } from './interfaces/dto/update-product.dto';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto): Promise<IProduct> {
    try {
      return await this.prisma.product.create({ data });
    } catch (error) {
      throw error;
    }
  }

  async findAll(filters: FilterProductsDTO): Promise<IProduct[]> {
    try {
      return await this.prisma.product.findMany({
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
          category:
            { contains: filters.category, mode: 'insensitive' } || undefined,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<IProduct> {
    try {
      return await this.prisma.product.findUnique({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: UpdateProductDto): Promise<IProduct> {
    try {
      return await this.prisma.product.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<IProduct> {
    try {
      return await this.prisma.product.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
