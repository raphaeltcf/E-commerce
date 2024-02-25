import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './interfaces/dto/create-transaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterTransactionsDTO } from './interfaces/dto/filter-transactions.dto';

@ApiBearerAuth('token')
@ApiTags('Transactions')
@Controller('api/v1/transaction')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('')
  async getTransactions(@Query() filters: FilterTransactionsDTO) {
    return await this.transactionsService.findAll(filters);
  }

  @Post('/card')
  async paymentCard(@Body() createTransactionDto: CreateTransactionDto) {
    return await this.transactionsService.create(createTransactionDto);
  }
}
