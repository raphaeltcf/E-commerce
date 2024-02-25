import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateSalesReportDto } from './interfaces/dto/update-sales-report.dto';

import * as fs from 'fs';
import { Prisma } from '@prisma/client';
import { FilterSalesReportDto } from './interfaces/dto/filter-sales-report.dto';
import { TransactionsService } from 'src/modules/transactions/transactions.service';
import { ItemOrderService } from 'src/modules/item-order/item-order.service';
import { AwsService } from 'src/modules/aws/aws.service';
import { v4 as uuidv4 } from 'uuid';
import { SalesReportRepository } from './sales-report.repository';
import { ISalesReport } from './interfaces/sales-report.interface';
import { writeToCsv } from 'src/core/utils/write-to-csv';

@Injectable()
export class SalesReportService {
  constructor(
    private salesReportRepository: SalesReportRepository,
    private transactionsService: TransactionsService,
    private itemOrderService: ItemOrderService,
    private awsService: AwsService,
  ) {}

  async create(data: FilterSalesReportDto): Promise<ISalesReport> {
    const allData = [];

    try {
      const transactions = await this.transactionsService.findByDate(
        data.minDate,
        data.maxDate,
      );

      let totalProducts = 0;
      let totalPrice = 0;

      for (const transaction of transactions) {
        let products_count = 0;

        const products = await this.itemOrderService.findByOrderId(
          transaction.orderId,
        );

        for (const product of products) {
          products_count = products_count + product.quantity;
        }

        totalProducts += products_count;
        totalPrice += Number(transaction.amount);

        allData.push({
          total: Number(transaction.amount),
          products: products_count,
        });
      }

      await writeToCsv(allData, 'output.csv');

      const fileContent = fs.readFileSync('output.csv');
      const uuid = uuidv4();

      const aws = await this.awsService.uploadPublicFile(
        fileContent,
        `${uuid}.csv`,
      );

      return await this.salesReportRepository.create({
        path: aws.Location,
        total: totalPrice,
        products: totalProducts,
        period: { minDate: data.minDate, maxDate: data.maxDate },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error with Sale-Report`);
      }
    }
  }

  async findAll(): Promise<ISalesReport[]> {
    return await this.salesReportRepository.findAll();
  }

  async findOne(id: string): Promise<ISalesReport> {
    try {
      const salesReport = await this.salesReportRepository.findOneById(id);

      if (!salesReport) {
        throw new NotFoundException(`Sales-report with ID ${id} not found`);
      }

      return salesReport;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error with Sales-report`);
      }
    }
  }

  async update(
    id: string,
    updateSalesReportDto: UpdateSalesReportDto,
  ): Promise<ISalesReport> {
    try {
      const salesReport = await this.salesReportRepository.findOneById(id);

      if (!salesReport) {
        throw new NotFoundException(`Sales-Report with ID ${id} not found`);
      }

      return await this.salesReportRepository.update(id, updateSalesReportDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error with Sales-Report`);
      }
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const sale = await this.salesReportRepository.findOneById(id);

      if (!sale) {
        throw new NotFoundException(`Sale with ID ${id} not found`);
      }

      await this.salesReportRepository.remove(id);

      return { message: 'Sale deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error deleting sale`);
      }
    }
  }
}
