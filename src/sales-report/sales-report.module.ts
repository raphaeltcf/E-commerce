import { Module } from '@nestjs/common';
import { SalesReportService } from './sales-report.service';
import { SalesReportController } from './sales-report.controller';
<<<<<<< HEAD
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SalesReportController],
  providers: [SalesReportService, PrismaService],
=======

@Module({
  controllers: [SalesReportController],
  providers: [SalesReportService],
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
})
export class SalesReportModule {}
