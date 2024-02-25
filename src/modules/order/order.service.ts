import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './interfaces/dto/create-order.dto';
import { UpdateOrderDto } from './interfaces/dto/update-order.dto';
import { FilterOrderDTO } from './interfaces/dto/filter-order.dto';
import { UpdateStatusDto } from './interfaces/dto/update-status.dto';
import { CustomersService } from 'src/modules/customers/customers.service';
import { UsersService } from 'src/modules/users/users.service';
import { EmailService } from 'src/modules/email/email.service';
import { OrderRepository } from './order.repository';
import { Prisma } from '@prisma/client';

import { getMessageByStatus } from 'src/core/utils/get-message';
import { IOrder } from './interfaces/order.interface';

@Injectable()
export class OrderService {
  constructor(
    private readonly customerService: CustomersService,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(data: CreateOrderDto): Promise<IOrder> {
    try {
      const customerService = await this.customerService.findOne(
        data.customerId,
      );

      if (!customerService) {
        throw new NotFoundException(
          `Customer with ID ${data.customerId} not found`,
        );
      }

      return await this.orderRepository.create(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error creating order`);
      }
    }
  }

  async findAll(filters: FilterOrderDTO): Promise<IOrder[]> {
    try {
      return await this.orderRepository.findAll(filters);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error with order`);
      }
    }
  }

  async findOne(id: string): Promise<IOrder> {
    try {
      const order = await this.orderRepository.findOne(id);

      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      return order;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error with Order`);
      }
    }
  }

  async update(id: string, data: UpdateOrderDto): Promise<IOrder> {
    try {
      const existingOrder = await this.orderRepository.findOne(id);
      if (!existingOrder) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return this.orderRepository.update(id, data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error updating Order`);
      }
    }
  }

  async updateStatus(id: string, data: UpdateStatusDto): Promise<IOrder> {
    const order = await this.orderRepository.findOne(id);

    try {
      const existingOrder = await this.orderRepository.findOne(id);
      if (!existingOrder) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      const customer = await this.customerService.findOne(order.customerId);
      const user = await this.usersService.findOne(customer.userId);

      const orderResult = await this.orderRepository.update(id, data);

      await this.emailService.sendMail({
        email: user.email,
        title: 'Alteração no Status do seu pedido!',
        body: getMessageByStatus(data.status, user.name, orderResult.id),
      });

      return orderResult;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error updating Order`);
      }
    }
  }

  async updateTotal(id: string, price: number): Promise<IOrder> {
    try {
      const existingUpdateTotal = await this.orderRepository.findOne(id);

      if (!existingUpdateTotal) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      return await this.orderRepository.updateTotal(id, price);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error updating Order`);
      }
    }
  }

  async remove(id: string): Promise<{
    message: string;
  }> {
    try {
      const order = await this.orderRepository.findOne(id);

      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      await this.orderRepository.remove(id);

      return { message: 'Order deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error deleting Order`);
      }
    }
  }
}
