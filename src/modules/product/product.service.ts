import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './interfaces/dto/create-product.dto';
import { UpdateProductDto } from './interfaces/dto/update-product.dto';
import { FilterProductsDTO } from './interfaces/dto/filter-products.dto';
import { ProductRepository } from './product.repository';
import { Prisma } from '@prisma/client';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  create(data: CreateProductDto): Promise<IProduct> {
    return this.productRepository.create(data);
  }

  findAll(filters: FilterProductsDTO): Promise<IProduct[]> {
    return this.productRepository.findAll(filters);
  }

  async findOne(id: string): Promise<IProduct> {
    try {
      const product = await this.productRepository.findOne(id);

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

  async update(id: string, data: UpdateProductDto): Promise<IProduct> {
    try {
      const existingProduct = await this.productRepository.findOne(id);
      if (!existingProduct) {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }
      return await this.productRepository.update(id, data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error updating Product`);
      }
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const product = await this.productRepository.findOne(id);

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      await this.productRepository.remove(id);

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
