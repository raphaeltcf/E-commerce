import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilterTransactionsDTO } from './dto/filter-transactions.dto';

@ApiBearerAuth('token')
@ApiTags('Transactions')
@Controller('api/v1/transaction')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('')
  getTransactions(@Query() filters: FilterTransactionsDTO) {
    return this.transactionsService.findAll(filters);
  }

  @Post('/card')
  paymentCard(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }
}
