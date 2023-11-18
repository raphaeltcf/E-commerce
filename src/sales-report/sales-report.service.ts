import { Injectable } from '@nestjs/common';
import { CreateSalesReportDto } from './dto/create-sales-report.dto';
import { UpdateSalesReportDto } from './dto/update-sales-report.dto';
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
  }
}
