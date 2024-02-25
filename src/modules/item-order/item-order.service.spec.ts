import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ItemOrderService } from './item-order.service';
import { OrderService } from 'src/modules/order/order.service';
import { ProductService } from 'src/modules/product/product.service';
import { CreateItemOrderDto } from './interfaces/dto/create-item-order.dto';
import { CustomersService } from 'src/modules/customers/customers.service';
import { UsersService } from 'src/modules/users/users.service';
import { EmailService } from 'src/modules/email/email.service';
import { ItemOrderRepository } from './item-order.repository';
import { CustomersRepository } from '../customers/customers.repository';
import { UsersRepository } from '../users/users.repository';
import { OrderRepository } from '../order/order.repository';
import { ProductRepository } from '../product/product.repository';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { stringified } from 'src/core/utils/get-json';

describe('Item-Order (e2e)', () => {
  let app: INestApplication;
  let itemOrderService: ItemOrderService;
  let sendMailMock;

  beforeAll(async () => {
    sendMailMock = jest
      .fn()
      .mockImplementation(() => console.log('email sent'));

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        ItemOrderService,
        ItemOrderRepository,
        CustomersService,
        CustomersRepository,
        UsersService,
        UsersRepository,
        EmailService,
        OrderService,
        OrderRepository,
        ProductService,
        ProductRepository,
      ],
    })
      .overrideProvider(EmailService)
      .useValue({ sendMail: sendMailMock })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    itemOrderService = moduleFixture.get<ItemOrderService>(ItemOrderService);
  });

  it('Create Item-order with non-existent order id', async () => {
    const data = {
      orderId: '123',
      productId: '1448f38f-b405-436e-8c27-892049957578',
      quantity: 1,
      price: 10,
      subtotal: 10,
    };

    try {
      await itemOrderService.create(data);

      fail('order Id not found');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('Create Item-order with non-existent product id', async () => {
    const itemOrderWithNonExistentProduct = {
      orderId: 'e0bfaefe-49a9-42b0-855a-5748c2eb240a',
      productId: '123',
      quantity: 1,
      price: 10,
      subtotal: 10,
    };

    try {
      await itemOrderService.create(itemOrderWithNonExistentProduct);

      fail('product Id not found');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('should empty orderId', async () => {
    const emptyId: CreateItemOrderDto = {
      orderId: '',
      productId: '123',
      quantity: 1,
      price: 10,
      subtotal: 10,
    };

    const myDtoObject = plainToInstance(CreateItemOrderDto, emptyId);
    const errors = await validate(myDtoObject);

    expect(errors.length).not.toBe(0);
    expect(stringified(errors)).toContain(`orderId should not be empty`);
  });

  it('should empty productId', async () => {
    const emptyProductId: CreateItemOrderDto = {
      orderId: 'e0bfaefe-49a9-42b0-855a-5748c2eb240a',
      productId: '',
      quantity: 1,
      price: 10,
      subtotal: 10,
    };

    const myDtoObject = plainToInstance(CreateItemOrderDto, emptyProductId);
    const errors = await validate(myDtoObject);

    expect(errors.length).not.toBe(0);
    expect(stringified(errors)).toContain(`productId should not be empty`);
  });
});
