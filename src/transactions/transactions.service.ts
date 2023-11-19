import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderService } from 'src/order/order.service';
import { EmailService } from 'src/email/email.service';
import { paymentMessage } from 'src/email/templates';
import { UsersService } from 'src/users/users.service';
import { CustomersService } from 'src/customers/customers.service';
import { FilterTransactionsDTO } from './dto/filter-transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orderService: OrderService,
    private readonly customersService: CustomersService,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  async create(data: CreateTransactionDto) {
    const order = await this.orderService.findOne(data.orderId);

    if (order) {
      const customer = await this.customersService.findOne(order.customerId);
      const user = await this.usersService.findOne(customer.userId);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { cardNumber, cvv, ...dataWithoutCardNumber } = data;

      const transactionData = {
        ...dataWithoutCardNumber,
        amount: order.total,
        cvv: Number(cvv),
      };

      const result = this.prisma.transactions.create({ data: transactionData });

      await this.orderService.update(order.id, { status: 'PREPARO' });
      await this.emailService.sendMail({
        email: user.email,
        title: 'Mensagem referente ao seu pagamento!',
        body: paymentMessage(customer.fullName, order.id),
      });

      return result;
    }
  }

  findAll(filters: FilterTransactionsDTO) {
    return this.prisma.transactions.findMany({
      where: {
        customerName:
          { contains: filters.name, mode: 'insensitive' } || undefined,
        cardType:
          { contains: filters.cardType, mode: 'insensitive' } || undefined,
        amount:
          { gte: Number(filters.minPrice), lte: Number(filters.maxPrice) } ||
          undefined,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.transactions.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateTransactionDto) {
    return this.prisma.transactions.update({
      data: { ...data, cvv: Number(data.cvv) },
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.transactions.delete({ where: { id } });
  }
}
