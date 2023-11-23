import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateSalesReportDto } from './dto/update-sales-report.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as fastCsv from 'fast-csv';
import { Prisma } from '@prisma/client';
import { FilterSalesReportDto } from './dto/filter-sales-report.dto';
import { TransactionsService } from 'src/transactions/transactions.service';
import { ItemOrderService } from 'src/item-order/item-order.service';
import { AwsService } from 'src/aws/aws.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SalesReportService {
  constructor(
    private prisma: PrismaService,
    private transactionsService: TransactionsService,
    private itemOrderService: ItemOrderService,
    private awsService: AwsService,
  ) {}

  async create(data: FilterSalesReportDto) {
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

      await this.writeToCsv(allData, 'output.csv');

      const fileContent = fs.readFileSync('output.csv');
      const uuid = uuidv4();

      const aws = await this.awsService.uploadPublicFile(
        fileContent,
        `${uuid}.csv`,
      );

      return this.prisma.saleReport.create({
        data: {
          path: aws.Location,
          total: totalPrice,
          products: totalProducts,
          period: { minDate: data.minDate, maxDate: data.maxDate },
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error with Sale-Report`);
      }
    }
  }

  findAll() {
    return this.prisma.saleReport.findMany();
  }

  findOne(id: string) {
    return this.prisma.saleReport.findUnique({ where: { id } });
  }

  update(id: string, updateSalesReportDto: UpdateSalesReportDto) {
    return this.prisma.saleReport.update({
      where: { id },
      data: updateSalesReportDto,
    });
  }

  async remove(id: string) {
    try {
      const sale = await this.prisma.saleReport.findUnique({ where: { id } });

      if (!sale) {
        throw new NotFoundException(`Sale with ID ${id} not found`);
      }

      await this.prisma.saleReport.delete({ where: { id } });

      return { message: 'Sale deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error deleting sale`);
      }
    }
  }

  async writeToCsv(data: any[], filename: string): Promise<void> {
    const ws = fs.createWriteStream(filename);

    return new Promise((resolve, reject) => {
      fastCsv
        .write(data, { headers: true })
        .pipe(ws)
        .on('finish', () => resolve())
        .on('error', (error) => reject(error));
    });
  }
}
