import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { SalesReportService } from './sales-report.service';
import { UpdateSalesReportDto } from './interfaces/dto/update-sales-report.dto';
import { Roles } from 'src/core/decorators/roles.decorator';
import { ROLE } from '@prisma/client';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs';
import { FilterSalesReportDto } from './interfaces/dto/filter-sales-report.dto';

@ApiTags('Sales Report')
@Controller('/sales-report')
@ApiBearerAuth('token')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 401, description: 'Unauthorized.' })
export class SalesReportController {
  constructor(private readonly salesReportService: SalesReportService) {}

  @Post('')
  @Roles(ROLE.ADMIN)
  async create(
    @Query() filterSalesReportDto: FilterSalesReportDto,
    @Res() res: Response,
  ) {
    try {
      const filename = 'output.csv';

      await this.salesReportService.create(filterSalesReportDto);
      res.download(filename, filename, (err) => {
        if (err) {
          res.status(500).send('Erro ao baixar o arquivo.');
        } else {
          fs.unlinkSync(filename);
        }
      });
    } catch (error) {
      res.status(500).send('Erro ao gerar o arquivo CSV.');
    }
  }

  @Get('')
  @Roles(ROLE.ADMIN)
  async findAll() {
    return await this.salesReportService.findAll();
  }

  @Get(':id')
  @Roles(ROLE.ADMIN)
  async findOne(@Param('id') id: string) {
    return await this.salesReportService.findOne(id);
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateSalesReportDto: UpdateSalesReportDto,
  ) {
    return await this.salesReportService.update(id, updateSalesReportDto);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.salesReportService.remove(id);
  }
}
