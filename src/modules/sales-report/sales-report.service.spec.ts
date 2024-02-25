import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

import { EmailService } from '../email/email.service';
import { PrismaClient, ROLE } from '@prisma/client';
import { CustomersRepository } from '../customers/customers.repository';
import { CustomersService } from '../customers/customers.service';
import { OrderRepository } from '../order/order.repository';
import { OrderService } from '../order/order.service';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/interfaces/dto/create-user.dto';
import { CreateCustomerDto } from '../customers/interfaces/dto/create-customer.dto';
import { CreateProductDto } from '../product/interfaces/dto/create-product.dto';
import { ProductService } from '../product/product.service';
import { CreateOrderDto } from '../order/interfaces/dto/create-order.dto';
import { ItemOrderService } from '../item-order/item-order.service';
import { CreateItemOrderDto } from '../item-order/interfaces/dto/create-item-order.dto';
import { ItemOrderRepository } from '../item-order/item-order.repository';
import { ProductRepository } from '../product/product.repository';
import { CreateTransactionDto } from '../transactions/interfaces/dto/create-transaction.dto';
import { TransactionsRepository } from '../transactions/transactions.repository';
import { TransactionsService } from '../transactions/transactions.service';
import { SalesReportService } from './sales-report.service';
import { FilterSalesReportDto } from './interfaces/dto/filter-sales-report.dto';
import { SalesReportRepository } from './sales-report.repository';
import { AwsService } from '../aws/aws.service';

describe('Sales-Report (e2e)', () => {
  let app: INestApplication;
  let transactionsService: TransactionsService;
  let itemOrderService: ItemOrderService;
  let customersService: CustomersService;
  let productService: ProductService;
  let orderService: OrderService;
  let usersService: UsersService;
  let salesReportService: SalesReportService;

  let ids = [];
  let sendMailMock;

  beforeAll(async () => {
    sendMailMock = jest
      .fn()
      .mockImplementation(() => console.log('email sent'));

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        SalesReportService,
        SalesReportRepository,
        TransactionsService,
        TransactionsRepository,
        PrismaService,
        OrderService,
        OrderRepository,
        ItemOrderService,
        ItemOrderRepository,
        CustomersService,
        CustomersRepository,
        ProductService,
        ProductRepository,
        UsersService,
        UsersRepository,
        EmailService,
        AwsService,
      ],
    })
      .overrideProvider(EmailService)
      .useValue({ sendMail: sendMailMock })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    transactionsService =
      moduleFixture.get<TransactionsService>(TransactionsService);
    usersService = moduleFixture.get<UsersService>(UsersService);
    customersService = moduleFixture.get<CustomersService>(CustomersService);
    productService = moduleFixture.get<ProductService>(ProductService);
    orderService = moduleFixture.get<OrderService>(OrderService);
    itemOrderService = moduleFixture.get<ItemOrderService>(ItemOrderService);
    salesReportService =
      moduleFixture.get<SalesReportService>(SalesReportService);
  });

  it('Create a transaction', async () => {
    const userData: CreateUserDto = {
      name: 'Raphael Torres Cavalcanti Ferreira',
      email: 'salesReport@gmail.com',
      password: 'nJvn99fNE$3m',
      type: ROLE.CUSTOMER,
    };

    const user = await usersService.create(userData);
    ids = [...ids, { User: user.id }];

    expect(user).toBeDefined();

    const customerData: CreateCustomerDto = {
      userId: user.id,
      fullName: 'Raphael Torres Cavalcanti Ferreira',
      contact: '(81) 997546494',
      address: 'Rua são sebastião, 741. água Fria, Recife-PE',
      status: true,
    };

    const customer = await customersService.create(customerData);
    ids = [...ids, { Customer: customer.id }];

    expect(customer).toBeDefined();

    const productData: CreateProductDto = {
      name: 'Cadeira Gamer',
      description: 'Cadeira Gamer RGD REGULÁVEL',
      category: 'chairs',
      price: 1,
      stockQuantity: 10,
    };

    const product = await productService.create(productData);
    ids = [...ids, { Product: product.id }];

    expect(product).toBeDefined();

    const orderData: CreateOrderDto = {
      customerId: customer.id,
    };

    const order = await orderService.create(orderData);
    ids = [...ids, { Order: order.id }];

    expect(order).toBeDefined();

    const itemOrderData: CreateItemOrderDto = {
      orderId: order.id,
      productId: product.id,
      price: 1,
      quantity: 10,
      subtotal: 10,
    };

    const itemOrder = await itemOrderService.create(itemOrderData);
    ids = [...ids, { ItemOrder: itemOrder.id }];

    expect(itemOrder).toBeDefined();

    const transactionData: CreateTransactionDto = {
      orderId: order.id,
      customerName: 'Raphael Torres Cavalcanti Ferreira',
      cardNumber: '1234 5678 9012 3456',
      cardType: 'MasterCard',
      cvv: '123',
      expiryYear: 24,
      expiryMonth: 10,
    };

    const transaction = await transactionsService.create(transactionData);
    ids = [...ids, { Transaction: transaction.id }];

    expect(transaction).toBeDefined();

    const saleReportData: FilterSalesReportDto = {};

    const saleReport = await salesReportService.create(saleReportData);
    ids = [...ids, { SalesReport: saleReport.id }];

    expect(saleReport).toBeDefined();
  });

  afterAll(async () => {
    const prisma = new PrismaClient();

    for (let i = ids.length - 1; i >= 0; i--) {
      try {
        const id = ids[i];
        const moduleName = Object.keys(id)[0];
        const moduleId = id[moduleName];

        switch (moduleName) {
          case 'User':
            await prisma.user.delete({ where: { id: moduleId } });
            break;
          case 'Customer':
            await prisma.customer.delete({ where: { id: moduleId } });
            break;
          case 'Order':
            await prisma.order.delete({ where: { id: moduleId } });
            break;
          case 'Product':
            await prisma.product.delete({ where: { id: moduleId } });
            break;
          case 'ItemOrder':
            await prisma.itemOrder.delete({ where: { id: moduleId } });
            break;
          case 'Transaction':
            await prisma.transactions.delete({ where: { id: moduleId } });
            break;
          case 'SalesReport':
            await prisma.saleReport.delete({ where: { id: moduleId } });
            break;
          default:
            console.log(`Module ${moduleName} not found.`);
            break;
        }
      } catch (error) {
        console.error(`Error deleting module: ${error}`);
      }
    }

    await prisma.$disconnect();
  });
});
