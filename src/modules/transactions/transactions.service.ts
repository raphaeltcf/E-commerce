import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderService } from 'src/modules/order/order.service';
import { FilterTransactionsDTO } from './dto/filter-transactions.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orderService: OrderService,
  ) {}

  async create(data: CreateTransactionDto) {
    try {
      const order = await this.orderService.findOne(data.orderId);

      if (!order) {
        throw new NotFoundException(`Order with ID ${data.orderId} not found`);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { cardNumber, cvv, ...dataWithoutCardNumber } = data;

      const transactionData = {
        ...dataWithoutCardNumber,
        amount: order.total,
        cvv: Number(cvv),
      };

      const result = this.prisma.transactions.create({ data: transactionData });

      await this.orderService.updateStatus(order.id, { status: 'PREPARO' });

      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error creating transaction`);
      }
    }
  }

  findAll(filters: FilterTransactionsDTO) {
    return this.prisma.transactions.findMany({
      where: {
        customerName:
          { contains: filters.name, mode: 'insensitive' } || undefined,
        cardType:
          { contains: filters.cardType, mode: 'insensitive' } || undefined,
        amount:
          { gte: Number(filters.minPrice), lte: Number(filters.maxPrice) } ||
          undefined,
      },
    });
  }

  findByDate(minDate?: string, maxDate?: string) {
    return this.prisma.transactions.findMany({
      where: {
        createdAt: {
          gte: (minDate && this.convertToISODate(minDate)) || undefined,
          lte: (maxDate && this.convertToISODate(maxDate, true)) || undefined,
        },
      },
      include: { order: true },
    });
  }

  findOne(id: string) {
    return this.prisma.transactions.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateTransactionDto) {
    return this.prisma.transactions.update({
      data: { ...data, cvv: Number(data.cvv) },
      where: { id },
    });
  }

  async remove(id: string) {
    try {
      const transaction = await this.prisma.transactions.findUnique({
        where: { id },
      });

      if (!transaction) {
        throw new NotFoundException(`Transaction with ID ${id} not found`);
      }

      await this.prisma.transactions.delete({ where: { id } });

      return { message: 'Transaction deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error deleting transaction`);
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
