import { Module } from '@nestjs/common';
import { SalesReportService } from './sales-report.service';
import { SalesReportController } from './sales-report.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SalesReportController],
  providers: [SalesReportService, PrismaService],
})
export class SalesReportModule {}
