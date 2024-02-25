import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersService } from './users.service';
import { CreateUserDto } from './interfaces/dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { EmailService } from '../email/email.service';
import { PrismaClient, ROLE } from '@prisma/client';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { stringified } from 'src/core/utils/get-json';

describe('Users (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let data: CreateUserDto;
  let sendMailMock;

  beforeAll(async () => {
    sendMailMock = jest
      .fn()
      .mockImplementation(() => console.log('email sent'));

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository, PrismaService, EmailService],
    })
      .overrideProvider(EmailService)
      .useValue({ sendMail: sendMailMock })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    usersService = moduleFixture.get<UsersService>(UsersService);

    data = {
      name: 'Raphael Torres Cavalcanti Ferreira',
      email: 'userTest@gmail.com',
      password: 'nJvn99fNE$3m',
      type: ROLE.ADMIN,
    };

    const prisma = new PrismaClient();

    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      await prisma.user.delete({ where: { id: userExists.id } });
    }
  });

  it('Create a user as administrator', async () => {
    const user = await usersService.create(data);

    expect(user).toBeDefined();
  });

  it('Email already exists', async () => {
    try {
      await usersService.create(data);

      fail('Email already exists');
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
    }
  });

  it('should reject weak password', async () => {
    const weakPasswordData: CreateUserDto = {
      name: 'John Doe',
      email: data.email,
      password: 'tese',
      type: ROLE.CUSTOMER,
    };

    const myDtoObject = plainToInstance(CreateUserDto, weakPasswordData);
    const errors = await validate(myDtoObject);

    expect(errors.length).not.toBe(0);
    expect(stringified(errors)).toContain(`A senha tá bem fraquinha amigão`);
  });

  it('should empty name', async () => {
    const emptyName: CreateUserDto = {
      name: '',
      email: 'gabi@gmail.com',
      password: 'nJvn99fNE$3m',
      type: ROLE.CUSTOMER,
    };

    const myDtoObject = plainToInstance(CreateUserDto, emptyName);
    const errors = await validate(myDtoObject);

    expect(errors.length).not.toBe(0);
    expect(stringified(errors)).toContain(`name should not be empty`);
  });

  it('should empty password', async () => {
    const emptyPass: CreateUserDto = {
      name: 'gabi',
      email: 'gabi@gmail.com',
      password: '',
      type: ROLE.CUSTOMER,
    };

    const myDtoObject = plainToInstance(CreateUserDto, emptyPass);
    const errors = await validate(myDtoObject);

    expect(errors.length).not.toBe(0);
    expect(stringified(errors)).toContain(`password should not be empty`);
  });

  it('should empty email', async () => {
    const emptyEmail: CreateUserDto = {
      name: 'John Doe',
      email: '',
      password: 'nJvn99fNE$3m',
      type: ROLE.CUSTOMER,
    };

    const myDtoObject = plainToInstance(CreateUserDto, emptyEmail);
    const errors = await validate(myDtoObject);

    expect(errors.length).not.toBe(0);
    expect(stringified(errors)).toContain(`email should not be empty`);
  });

  afterAll(async () => {
    const prisma = new PrismaClient();

    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      await prisma.user.delete({ where: { id: userExists.id } });
    }

    await prisma.$disconnect();
  });
});
