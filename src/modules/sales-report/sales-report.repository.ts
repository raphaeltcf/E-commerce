import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UpdateSalesReportDto } from './interfaces/dto/update-sales-report.dto';
import { Prisma } from '@prisma/client';
import { ISalesReport } from './interfaces/sales-report.interface';

@Injectable()
export class SalesReportRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SaleReportCreateInput): Promise<ISalesReport> {
    try {
      return await this.prisma.saleReport.create({
        data,
      });
    } catch (error) {
      return error;
    }
  }

  async findAll(): Promise<ISalesReport[]> {
    try {
      return await this.prisma.saleReport.findMany();
    } catch (error) {
      return error;
    }
  }

  async findOneById(id: string): Promise<ISalesReport> {
    try {
      return await this.prisma.saleReport.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async update(id: string, data: UpdateSalesReportDto): Promise<ISalesReport> {
    try {
      return await this.prisma.saleReport.update({
        where: { id },
        data,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: string): Promise<ISalesReport> {
    try {
      return await this.prisma.saleReport.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      return error;
    }
  }
}
