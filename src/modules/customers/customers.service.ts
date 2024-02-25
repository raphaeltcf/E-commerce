import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './interfaces/dto/create-customer.dto';
import { UpdateCustomerDto } from './interfaces/dto/update-customer.dto';
import { FilterCustomersDTO } from './interfaces/dto/filter-customer.dto';
import { UsersService } from 'src/modules/users/users.service';
import { Prisma } from '@prisma/client';
import { CustomersRepository } from './customers.repository';
import { ICustomer } from './interfaces/customer.interface';

@Injectable()
export class CustomersService {
  constructor(
    private readonly usersService: UsersService,
    private readonly customersRepository: CustomersRepository,
  ) {}

  async create(data: CreateCustomerDto): Promise<ICustomer> {
    try {
      const userExists = await this.usersService.findOne(data.userId);

      if (!userExists) {
        throw new NotFoundException('User not found');
      }

      return this.customersRepository.create(data);
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

  async findAll(filters: FilterCustomersDTO): Promise<ICustomer[]> {
    return await this.customersRepository.findAll(filters);
  }

  async findOne(id: string): Promise<ICustomer> {
    try {
      const customer = await this.customersRepository.findOneById(id);

      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }

      return customer;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error with customer`);
      }
    }
  }

  async findCustomerProfile(userId: string): Promise<ICustomer> {
    try {
      const customerProfile =
        await this.customersRepository.findOneByUserId(userId);

      if (!customerProfile) {
        throw new NotFoundException(
          `customer Profile with ID ${userId} not found`,
        );
      }

      return customerProfile;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error with Order`);
      }
    }
  }

  async updateCustomer(
    userId: string,
    data: UpdateCustomerDto,
  ): Promise<ICustomer> {
    try {
      const updatedCustomer = await this.customersRepository.updateByUserId(
        userId,
        data,
      );

      return updatedCustomer;
    } catch (error) {
      throw new Error(`Erro ao atualizar o cliente: ${error.message}`);
    }
  }

  async update(id: string, data: UpdateCustomerDto): Promise<ICustomer> {
    try {
      const existingCustomer = await this.customersRepository.findOneById(id);

      if (!existingCustomer) {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }

      const updatedCustomer = await this.customersRepository.update(id, data);

      return updatedCustomer;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error updating customer`);
      }
    }
  }

  async remove(id: string): Promise<{
    message: string;
  }> {
    try {
      const customer = await this.customersRepository.findOneById(id);

      if (!customer) {
        throw new NotFoundException(`Customer with ID ${id} not found`);
      }

      await this.customersRepository.remove(id);
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
