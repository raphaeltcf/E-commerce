import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

describe('Product (e2e)', () => {
  let app: INestApplication;
  let data: CreateProductDto;
  let productService: ProductService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ProductService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    productService = moduleFixture.get<ProductService>(ProductService);
  });

  it('Create order with non-existent customer id (e2e)', async () => {
    data = {
      name: 'Produto teste',
      description: 'Este é um produto que faz parte de testes',
      category: 'test',
      price: 10,
      stockQuantity: 10,
    };

    const product = await productService.create(data);

    expect(product).toBeDefined();
  });
});
