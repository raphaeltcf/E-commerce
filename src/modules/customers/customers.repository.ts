import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { FilterCustomersDTO } from './interfaces/dto/filter-customer.dto';
import { UpdateCustomerDto } from './interfaces/dto/update-customer.dto';
import { CreateCustomerDto } from './interfaces/dto/create-customer.dto';
import { ICustomer } from './interfaces/customer.interface';

@Injectable()
export class CustomersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCustomerDto): Promise<ICustomer> {
    try {
      return await this.prisma.customer.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(filters: FilterCustomersDTO): Promise<ICustomer[]> {
    try {
      return await this.prisma.customer.findMany({
        where: {
          fullName:
            { contains: filters.name, mode: 'insensitive' } || undefined,
          status: Boolean(filters.active) || undefined,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string): Promise<ICustomer> {
    try {
      return await this.prisma.customer.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneByUserId(userId: string): Promise<ICustomer> {
    try {
      return await this.prisma.customer.findFirst({
        where: {
          userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: UpdateCustomerDto): Promise<ICustomer> {
    try {
      return await this.prisma.customer.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateByUserId(
    userId: string,
    data: UpdateCustomerDto,
  ): Promise<ICustomer> {
    try {
      return await this.prisma.customer.update({
        where: { userId },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<ICustomer> {
    try {
      return await this.prisma.customer.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
