import { Injectable } from '@nestjs/common';
import { CreateSalesReportDto } from './dto/create-sales-report.dto';
import { UpdateSalesReportDto } from './dto/update-sales-report.dto';
<<<<<<< HEAD
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SalesReportService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateSalesReportDto) {
    return this.prisma.saleReport.create({ data });
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

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
=======

@Injectable()
export class SalesReportService {
  create(createSalesReportDto: CreateSalesReportDto) {
    return 'This action adds a new salesReport';
  }

  findAll() {
    return `This action returns all salesReport`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salesReport`;
  }

  update(id: number, updateSalesReportDto: UpdateSalesReportDto) {
    return `This action updates a #${id} salesReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesReport`;
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  }
}
