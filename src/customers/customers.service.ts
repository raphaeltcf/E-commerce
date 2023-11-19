import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterCustomersDTO } from './dto/filter-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCustomerDto) {
    return this.prisma.customer.create({ data });
  }

  findAll(filters: FilterCustomersDTO) {
    return this.prisma.customer.findMany({
      where: {
        fullName: { contains: filters.name, mode: 'insensitive' } || undefined,
        status: Boolean(filters.active) || undefined,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  findCustomerProfile(userId: string) {
    return this.prisma.customer.findUnique({ where: { userId } });
  }

  async updateCustomer(userId: string, data: UpdateCustomerDto) {
    try {
      const updatedCustomer = await this.prisma.customer.update({
        where: { userId },
        data,
      });

      return updatedCustomer;
    } catch (error) {
      throw new Error(`Erro ao atualizar o cliente: ${error.message}`);
    }
  }

  update(id: string, data: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.customer.delete({ where: { id } });
  }
}
