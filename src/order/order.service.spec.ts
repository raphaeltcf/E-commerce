import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CustomersService } from 'src/customers/customers.service';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email/email.service';

describe('Order (e2e)', () => {
  let app: INestApplication;
  let orderService: OrderService;
  let data: CreateOrderDto;
  let sendMailMock;

  beforeEach(async () => {
    sendMailMock = jest
      .fn()
      .mockImplementation(() => console.log('email sent'));

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
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

    orderService = moduleFixture.get<OrderService>(OrderService);
  });

  it('Create order with non-existent customer id (e2e)', async () => {
    data = {
      customerId: '123',
    };

    try {
      await orderService.create(data);

      fail('Customer Id not found');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
