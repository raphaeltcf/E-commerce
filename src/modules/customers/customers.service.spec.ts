import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersService } from 'src/modules/users/users.service';
import { CustomersService } from 'src/modules/customers/customers.service';
import { EmailService } from 'src/modules/email/email.service';
import { PrismaClient } from '@prisma/client';
import { CreateCustomerUserDto } from './interfaces/dto/create-customer-user.dto';
import { UsersRepository } from '../users/users.repository';
import { CustomersRepository } from './customers.repository';

describe('Customer create (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let customersService: CustomersService;
  let data: CreateCustomerUserDto;
  let sendMailMock;

  beforeAll(async () => {
    sendMailMock = jest
      .fn()
      .mockImplementation(() => console.log('email sent'));

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        UsersService,
        UsersRepository,
        CustomersService,
        CustomersRepository,
        EmailService,
      ],
    })
      .overrideProvider(EmailService)
      .useValue({ sendMail: sendMailMock })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();

    usersService = moduleFixture.get<UsersService>(UsersService);
    customersService = moduleFixture.get<CustomersService>(CustomersService);

    data = {
      fullName: 'Raphael Torres Cavalcanti Ferreira',
      contact: '(81) 997546494',
      address: 'Rua são sebastião, 741. água Fria, Recife-PE',
      email: 'Guilherme@gmail.com',
      password: 'nJvn99fNE$3m',
    };

    const prisma = new PrismaClient();

    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      await prisma.customer.delete({ where: { userId: userExists.id } });
      await prisma.user.delete({ where: { id: userExists.id } });
    }

    await prisma.$disconnect();
  });

  it('Customer create', async () => {
    const { email, password, fullName, ...rest } = data;

    const user = await usersService.create({
      email,
      password,
      name: fullName,
      type: 'CUSTOMER',
    });

    expect(user).toBeDefined();

    const customer = await customersService.create({
      ...rest,
      fullName,
      userId: user.id,
      status: true,
    });

    expect(customer).toBeDefined();
  });

  afterAll(async () => {
    const prisma = new PrismaClient();

    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      await prisma.customer.delete({ where: { userId: userExists.id } });
      await prisma.user.delete({ where: { id: userExists.id } });
    }

    await prisma.$disconnect();
  });
});
