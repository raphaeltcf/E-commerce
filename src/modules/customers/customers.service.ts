import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterCustomersDTO } from './dto/filter-customer.dto';
import { UsersService } from 'src/modules/users/users.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async create(data: CreateCustomerDto) {
    try {
      const userExists = await this.usersService.findOne(data.userId);

      if (!userExists) {
        throw new NotFoundException('User not found');
      }

      return this.prisma.customer.create({ data });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException({
          statusCode: 404,
          message: error.message,
        });
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Customer already exists');
        }
      }
    }
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

  async update(id: string, data: UpdateCustomerDto) {
    try {
      const existingCustomer = await this.prisma.customer.findUnique({
        where: { id },
      });

      if (!existingCustomer) {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }

      const updatedCustomer = await this.prisma.customer.update({
        where: { id },
        data,
      });

      return updatedCustomer;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error updating customer`);
      }
    }
  }

  async remove(id: string) {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: { id },
      });

      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }

      await this.prisma.customer.delete({ where: { id } });
      await this.usersService.delete(customer.userId);

      return { message: 'Customer deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error deleting customer`);
      }
    }
  }
}
