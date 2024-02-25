import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './interfaces/dto/create-transaction.dto';
import { UpdateTransactionDto } from './interfaces/dto/update-transaction.dto';
import { OrderService } from 'src/modules/order/order.service';
import { FilterTransactionsDTO } from './interfaces/dto/filter-transactions.dto';
import { Prisma } from '@prisma/client';
import { TransactionsRepository } from './transactions.repository';
import { ITransaction } from './interfaces/transactions.interface';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly orderService: OrderService,
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async create(data: CreateTransactionDto): Promise<ITransaction> {
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

      const result = await this.transactionsRepository.create(transactionData);

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

  async findAll(filters: FilterTransactionsDTO): Promise<ITransaction[]> {
    return await this.transactionsRepository.findAll(filters);
  }

  async findByDate(
    minDate?: string,
    maxDate?: string,
  ): Promise<ITransaction[]> {
    return await this.transactionsRepository.findByDate(minDate, maxDate);
  }

  async findOne(id: string): Promise<ITransaction> {
    try {
      const transaction = await this.transactionsRepository.findOneById(id);

      if (!transaction) {
        throw new NotFoundException(`Transaction with ID ${id} not found`);
      }

      return transaction;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error with transanction`);
      }
    }
  }

  async update(id: string, data: UpdateTransactionDto): Promise<ITransaction> {
    try {
      const existingTransaction =
        await this.transactionsRepository.findOneById(id);

      if (!existingTransaction) {
        throw new NotFoundException(`Transaction with ID ${id} not found`);
      }

      return this.transactionsRepository.update(id, {
        ...data,
        cvv: Number(data.cvv),
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error updating transaction`);
      }
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const transaction = await this.transactionsRepository.findOneById(id);

      if (!transaction) {
        throw new NotFoundException(`Transaction with ID ${id} not found`);
      }

      await this.transactionsRepository.remove(id);

      return { message: 'Transaction deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error deleting transaction`);
      }
    }
  }
}
