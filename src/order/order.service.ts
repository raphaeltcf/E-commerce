import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterOrderDTO } from './dto/filter-order.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { CustomersService } from 'src/customers/customers.service';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email/email.service';
import { Prisma, STATUS } from '@prisma/client';
import {
  orderDelivered,
  orderShipped,
  preparedOrder,
} from 'src/email/templates';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly customerService: CustomersService,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  async create(data: CreateOrderDto) {
    try {
      const customerService = await this.customerService.findOne(
        data.customerId,
      );

      if (!customerService) {
        throw new NotFoundException(
          `Customer with ID ${data.customerId} not found`,
        );
      }

      return await this.prisma.order.create({ data });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error creating order`);
      }
    }
  }

  findAll(filters: FilterOrderDTO) {
    try {
      return this.prisma.order.findMany({
        where: {
          status: filters.status || undefined,
          total: {
            gte: Number(filters.minPrice) || undefined,
            lte: Number(filters.maxPrice) || undefined,
          },
          createdAt: {
            gte:
              (filters.minDate && this.convertToISODate(filters.minDate)) ||
              undefined,
            lte:
              (filters.maxDate &&
                this.convertToISODate(filters.maxDate, true)) ||
              undefined,
          },
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error with order`);
      }
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id },
        include: { itemOrder: true },
      });

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

  async update(id: string, data: UpdateOrderDto) {
    try {
      const existingOrder = await this.prisma.order.findUnique({
        where: { id },
      });
      if (!existingOrder) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return this.prisma.order.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error updating Order`);
      }
    }
  }

  async updateStatus(id: string, data: UpdateStatusDto) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    try {
      const existingOrder = await this.prisma.order.findUnique({
        where: { id },
      });
      if (!existingOrder) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      const customer = await this.customerService.findOne(order.customerId);
      const user = await this.usersService.findOne(customer.userId);

      const orderResult = await this.prisma.order.update({
        where: { id },
        data,
      });

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

  updateTotal(id: string, price: number) {
    return this.prisma.order.update({
      where: { id },
      data: { total: { increment: price } },
    });
  }

  async remove(id: string) {
    try {
      const order = await this.prisma.order.findUnique({ where: { id } });

      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      await this.prisma.order.delete({ where: { id } });

      return { message: 'Order deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error deleting Order`);
      }
    }
  }
  private convertToISODate(
    dateString: string,
    endOfDay: boolean = false,
  ): string {
    const [day, month, year] = dateString.split('/');
    const isoDate = new Date(
      `${year}-${month}-${day}${endOfDay ? 'T23:59:59' : ''}`,
    ).toISOString();
    return isoDate;
  }
}

const getMessageByStatus = (
  status: STATUS,
  userName: string,
  orderId: string,
) => {
  switch (status) {
    case 'RECEBIDO':
      return 'Pedido recebido com sucesso.';
    case 'PREPARO':
      return preparedOrder(userName, orderId);
    case 'DESPACHADO':
      return orderShipped(userName);
    case 'ENTREGUE':
      return orderDelivered(userName);
    default:
      return 'Status desconhecido.';
  }
};
