import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SalesReportService } from './sales-report.service';
import { CreateSalesReportDto } from './dto/create-sales-report.dto';
import { FilterSalesReportDto } from './dto/filter-sales-report.dto';
import { OrderService } from 'src/order/order.service';
import { CustomersService } from 'src/customers/customers.service';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email/email.service';

describe('Order (e2e)', () => {
  let app: INestApplication;
  let salesReportService: SalesReportService;
  let data: CreateSalesReportDto;
  let sendMailMock;

  beforeEach(async () => {
    sendMailMock = jest
      .fn()
      .mockImplementation(() => console.log('email sent'));

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        SalesReportService,
        OrderService,
        CustomersService,
        UsersService,
        EmailService,
      ],
    })
      .overrideProvider(EmailService)
      .useValue({ sendMail: sendMailMock })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    salesReportService =
      moduleFixture.get<SalesReportService>(SalesReportService);
  });

  it('Create order with non-existent data (e2e)', async () => {
    data = {
      minDate: '123',
    };

    try {
      await orderService.create(data);

      fail('Customer Id not found');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
