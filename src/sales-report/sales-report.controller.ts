import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalesReportService } from './sales-report.service';
import { CreateSalesReportDto } from './dto/create-sales-report.dto';
import { UpdateSalesReportDto } from './dto/update-sales-report.dto';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { ROLE } from '@prisma/client';

@Controller('/sales-report')
export class SalesReportController {
  constructor(private readonly salesReportService: SalesReportService) {}

  @Post('')
  @Roles(ROLE.ADMIN)
  create(@Body() createSalesReportDto: CreateSalesReportDto) {
    return this.salesReportService.create(createSalesReportDto);
  }

  @Get('')
  @Roles(ROLE.ADMIN)
  findAll() {
    return this.salesReportService.findAll();
  }

  @Get(':id')
  @Roles(ROLE.ADMIN)
  findOne(@Param('id') id: string) {
    return this.salesReportService.findOne(id);
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateSalesReportDto: UpdateSalesReportDto,
  ) {
    return this.salesReportService.update(id, updateSalesReportDto);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  remove(@Param('id') id: string) {
    return this.salesReportService.remove(id);
  }
}
