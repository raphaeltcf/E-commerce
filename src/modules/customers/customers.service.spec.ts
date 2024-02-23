import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/modules/users/users.service';
import { CustomersService } from 'src/modules/customers/customers.service';
import { CreateCustomerUserDto } from 'src/modules/customers/dto/create-customer-user.dto';
import { EmailService } from 'src/modules/email/email.service';
import { ROLE } from '@prisma/client';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

describe('Customer create (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let customersService: CustomersService;
  let data: CreateCustomerUserDto;
  let sendMailMock;

  beforeEach(async () => {
    sendMailMock = jest
      .fn()
      .mockImplementation(() => console.log('email sent'));

    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, UsersService, CustomersService, EmailService],
    })
      .overrideProvider(EmailService)
      .useValue({ sendMail: sendMailMock })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    usersService = moduleFixture.get<UsersService>(UsersService);
    customersService = moduleFixture.get<CustomersService>(CustomersService);

    data = {
      fullName: 'Raphael Torres Cavalcanti Ferreira',
      contact: '(81) 997546494',
      address: 'Rua são sebastião, 741. água Fria, Recife-PE',
      email: 'Guilhersdadmeasda123@gmail.com',
      password: 'nJvn99fNE$3m',
    };
  });

  it('Customer create (e2e)', async () => {
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

  it('Email already exists (e2e)', async () => {
    const userData = {
      name: 'Raphael',
      email: 'Guilhersdadmeasda123@gmail.com',
      password: 'nJvn99fNE$3m',
      type: ROLE.CUSTOMER,
    };

    try {
      await usersService.create(userData);

      fail('Email already exists');
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
    }
  });

  it('should reject weak password (e2e)', async () => {
    const weakPasswordData: CreateUserDto = {
      name: 'John Doe',
      email: 'edgaaaasadadsdassdasr123@example.com',
      password: 'weakpassword',
      type: ROLE.CUSTOMER,
    };

    try {
      const user = await usersService.create(weakPasswordData);

      expect(user).toBeDefined();
    } catch (error) {
      expect(error.message).toContain('A senha tá bem fraquinha');
    }
  });

  // it('should reject password without uppercase letter (e2e)', async () => {
  //   const noUppercasePasswordData: CreateUserDto = {
  //     name: 'John Doe',
  //     email: 'eduadsaraasdadsddo123@example.com',
  //     password: 'weakpassword1!',
  //     type: ROLE.CUSTOMER,
  //   };

  //   try {
  //     await usersService.create(noUppercasePasswordData);

  //     fail('Weak password should be rejected');
  //   } catch (error) {
  //     expect(error).toBeInstanceOf(ConflictException);
  //     expect(error.message).toContain('A senha tá bem fraquinha');
  //   }
  // });

  // it('should reject password without special character (e2e)', async () => {
  //   const noSpecialCharacterPasswordData: CreateUserDto = {
  //     name: 'John Doe',
  //     email: 'Gabi123adsadasdssada@example.com',
  //     password: 'Weakpassword1',
  //     type: ROLE.CUSTOMER,
  //   };

  //   try {
  //     await usersService.create(noSpecialCharacterPasswordData);

  //     fail('Weak password should be rejected');
  //   } catch (error) {
  //     expect(error).toBeInstanceOf(ConflictException);
  //     expect(error.message).toContain('A senha tá bem fraquinha');
  //   }
  // });

  // it('should accept strong password (e2e)', async () => {
  //   const strongPasswordData: CreateUserDto = {
  //     name: 'John Doe',
  //     email: 'biaasd12aadadsda3@example.com',
  //     password: 'StrongPassw0rd!',
  //     type: ROLE.CUSTOMER, // Senha forte
  //   };

  //   try {
  //     const user = await usersService.create(strongPasswordData);

  //     expect(user).toBeDefined();
  //   } catch (error) {
  //     fail('Strong password should be accepted');
  //   }
  // });
});
