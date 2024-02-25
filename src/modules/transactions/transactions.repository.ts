import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { FilterTransactionsDTO } from './interfaces/dto/filter-transactions.dto';
import { parseDateStringToISO } from 'src/core/utils/parse-date';
import { ITransaction } from './interfaces/transactions.interface';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    amount: Prisma.Decimal;
    cvv: number;
    customerName: string;
    orderId: string;
    cardType: string;
    expiryMonth: number;
    expiryYear: number;
  }): Promise<ITransaction> {
    try {
      return await this.prisma.transactions.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(filters: FilterTransactionsDTO): Promise<ITransaction[]> {
    try {
      return await this.prisma.transactions.findMany({
        where: {
          customerName:
            { contains: filters.name, mode: 'insensitive' } || undefined,
          cardType:
            { contains: filters.cardType, mode: 'insensitive' } || undefined,
          amount: {
            gte: Number(filters.minPrice) || undefined,
            lte: Number(filters.maxPrice) || undefined,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string): Promise<ITransaction> {
    try {
      return await this.prisma.transactions.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findByDate(
    minDate?: string,
    maxDate?: string,
  ): Promise<ITransaction[]> {
    try {
      return await this.prisma.transactions.findMany({
        where: {
          createdAt: {
            gte: (minDate && parseDateStringToISO(minDate)) || undefined,
            lte: (maxDate && parseDateStringToISO(maxDate, true)) || undefined,
          },
        },
        include: { order: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    data: Prisma.TransactionsUpdateInput,
  ): Promise<ITransaction> {
    try {
      return await this.prisma.transactions.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<ITransaction> {
    try {
      return await this.prisma.transactions.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
