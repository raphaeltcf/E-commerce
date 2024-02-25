import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './interfaces/dto/create-product.dto';
import { PrismaClient } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { stringified } from 'src/core/utils/get-json';

describe('Product (e2e)', () => {
  let app: INestApplication;
  let data: CreateProductDto;
  let productService: ProductService;
  let id = null;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ProductService, ProductRepository],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    productService = moduleFixture.get<ProductService>(ProductService);
  });

  it('Create order with non-existent customer id', async () => {
    data = {
      name: 'Produto teste',
      description: 'Este é um produto que faz parte de testes',
      category: 'test',
      price: 10,
      stockQuantity: 10,
    };

    const product = await productService.create(data);
    id = product;

    expect(product).toBeDefined();
  });

  it('should empty name', async () => {
    const emptyName: CreateProductDto = {
      name: '',
      description: 'Este é um produto que faz parte de testes',
      category: 'test',
      price: 10,
      stockQuantity: 10,
    };

    const myDtoObject = plainToInstance(CreateProductDto, emptyName);
    const errors = await validate(myDtoObject);

    expect(errors.length).not.toBe(0);
    expect(stringified(errors)).toContain(`name should not be empty`);
  });

  it('should empty description', async () => {
    const emptyDesc: CreateProductDto = {
      name: 'cadeira de teste',
      description: '',
      category: 'test',
      price: 10,
      stockQuantity: 10,
    };

    const myDtoObject = plainToInstance(CreateProductDto, emptyDesc);
    const errors = await validate(myDtoObject);

    expect(errors.length).not.toBe(0);
    expect(stringified(errors)).toContain(`description should not be empty`);
  });

  it('should empty category', async () => {
    const emptyCate: CreateProductDto = {
      name: 'cadeira de category',
      description: 'Cadeira de testes',
      category: '',
      price: 10,
      stockQuantity: 10,
    };

    const myDtoObject = plainToInstance(CreateProductDto, emptyCate);
    const errors = await validate(myDtoObject);

    expect(errors.length).not.toBe(0);
    expect(stringified(errors)).toContain(`category should not be empty`);
  });

  it('should empty price', async () => {
    const emptyPrice: CreateProductDto = {
      name: 'cadeira de category',
      description: 'Cadeira de testes',
      category: 'test',
      price: null,
      stockQuantity: 10,
    };

    const myDtoObject = plainToInstance(CreateProductDto, emptyPrice);
    const errors = await validate(myDtoObject);

    expect(errors.length).not.toBe(0);
    expect(stringified(errors)).toContain(`price should not be empty`);
  });

  it('should empty stock', async () => {
    const emptyStock: CreateProductDto = {
      name: 'cadeira de category',
      description: 'Cadeira de testes',
      category: 'test',
      price: 10,
      stockQuantity: null,
    };

    const myDtoObject = plainToInstance(CreateProductDto, emptyStock);
    const errors = await validate(myDtoObject);

    expect(errors.length).not.toBe(0);
    expect(stringified(errors)).toContain(`stockQuantity should not be empty`);
  });

  afterAll(async () => {
    const prisma = new PrismaClient();

    if (id) [await prisma.product.delete({ where: id })];

    await prisma.$disconnect();
  });
});
