import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { OrderService } from './order.service';
import { CreateOrderDto } from './interfaces/dto/create-order.dto';
import { CustomersService } from 'src/modules/customers/customers.service';
import { UsersService } from 'src/modules/users/users.service';
import { EmailService } from 'src/modules/email/email.service';
import { OrderRepository } from './order.repository';
import { CustomersRepository } from '../customers/customers.repository';
import { UsersRepository } from '../users/users.repository';

describe('Order (e2e)', () => {
  let app: INestApplication;
  let orderService: OrderService;
  let data: CreateOrderDto;
  let sendMailMock;

  beforeAll(async () => {
    sendMailMock = jest
      .fn()
      .mockImplementation(() => console.log('email sent'));

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        OrderService,
        OrderRepository,
        CustomersService,
        CustomersRepository,
        UsersService,
        UsersRepository,
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

  it('Create order with non-existent customer id', async () => {
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
