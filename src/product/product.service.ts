import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterProductsDTO } from './dto/filter-products.dto';
import { Prisma } from '@prisma/client';

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
        category:
          { contains: filters.category, mode: 'insensitive' } || undefined,
      },
    });
  }

  async findOne(id: string) {
    try {
      const product = await this.prisma.product.findUnique({ where: { id } });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error with Product`);
      }
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const existingProduct = await this.prisma.product.findUnique({
        where: { id },
      });
      if (!existingProduct) {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }
      return this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error updating Product`);
      }
    }
  }

  async remove(id: string) {
    try {
      const product = await this.prisma.product.findUnique({ where: { id } });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      await this.prisma.product.delete({ where: { id } });

      return { message: 'Product deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error deleting Product`);
      }
    }
  }
}
