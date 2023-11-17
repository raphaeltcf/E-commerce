import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesReportService } from './sales-report.service';
import { CreateSalesReportDto } from './dto/create-sales-report.dto';
import { UpdateSalesReportDto } from './dto/update-sales-report.dto';

@Controller('sales-report')
export class SalesReportController {
  constructor(private readonly salesReportService: SalesReportService) {}

  @Post()
  create(@Body() createSalesReportDto: CreateSalesReportDto) {
    return this.salesReportService.create(createSalesReportDto);
  }

  @Get()
  findAll() {
    return this.salesReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesReportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalesReportDto: UpdateSalesReportDto) {
    return this.salesReportService.update(+id, updateSalesReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesReportService.remove(+id);
  }
}
