import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemOrderService } from './item-order.service';
import { OrderService } from 'src/modules/order/order.service';
import { ProductService } from 'src/modules/product/product.service';
import { CreateItemOrderDto } from './dto/create-item-order.dto';
import { CustomersService } from 'src/modules/customers/customers.service';
import { UsersService } from 'src/modules/users/users.service';
import { EmailService } from 'src/modules/email/email.service';

describe('Item-Order (e2e)', () => {
  let app: INestApplication;
  let itemOrderService: ItemOrderService;
  let data: CreateItemOrderDto;
  let sendMailMock;

  beforeEach(async () => {
    sendMailMock = jest
      .fn()
      .mockImplementation(() => console.log('email sent'));

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        ItemOrderService,
        CustomersService,
        UsersService,
        EmailService,
        OrderService,
        ProductService,
      ],
    })
      .overrideProvider(EmailService)
      .useValue({ sendMail: sendMailMock })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    itemOrderService = moduleFixture.get<ItemOrderService>(ItemOrderService);
  });

  it('Create Item-order with non-existent order id (e2e)', async () => {
    data = {
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

  it('Create Item-order with non-existent product id (e2e)', async () => {
    data = {
      orderId: 'e0bfaefe-49a9-42b0-855a-5748c2eb240a',
      productId: '123',
      quantity: 1,
      price: 10,
      subtotal: 10,
    };

    try {
      await itemOrderService.create(data);

      fail('product Id not found');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
