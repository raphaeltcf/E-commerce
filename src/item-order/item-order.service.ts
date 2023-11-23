import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateItemOrderDto } from './dto/create-item-order.dto';
import { UpdateItemOrderDto } from './dto/update-item-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ItemOrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
  ) {}

  async create(data: CreateItemOrderDto) {
    try {
      const product = await this.productService.findOne(data.productId);

      if (!product) {
        throw new NotFoundException(
          `Product with ID ${data.productId} not found`,
        );
      }

      const orderId = await this.orderService.findOne(data.orderId);

      if (!orderId) {
        throw new NotFoundException(`Order with ID ${data.orderId} not found`);
      }

      if (product.stockQuantity >= data.quantity) {
        const total = Number(product.price) * data.quantity;

        await this.orderService.updateTotal(data.orderId, total);

        const itemOrderData = {
          ...data,
          price: Number(product.price),
          subtotal: total,
        };

        await this.productService.update(product.id, {
          stockQuantity: product.stockQuantity - data.quantity,
        });

        return this.prisma.itemOrder.create({ data: itemOrderData });
      } else {
        throw new UnprocessableEntityException(
          `O produto selecionado não pode ser adicionado ao pedido devido à disponibilidade limitada ou outras restrições. Quantidade Disponível: ${product.stockQuantity}`,
        );
      }
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnprocessableEntityException
      ) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error updating Item-Order`);
      }
    }
  }

  findAll() {
    return this.prisma.itemOrder.findMany();
  }

  findByOrderId(orderId: string) {
    return this.prisma.itemOrder.findMany({
      where: { orderId },
      include: { product: true },
    });
  }

  async findOne(id: string) {
    try {
      const itemOrder = await this.prisma.itemOrder.findUnique({
        where: { id },
      });

      if (!itemOrder) {
        throw new NotFoundException(`Item-Order with ID ${id} not found`);
      }

      return itemOrder;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error with Item-Order`);
      }
    }
  }

  async update(id: string, updateItemOrderDto: UpdateItemOrderDto) {
    try {
      const existingItemOrder = await this.prisma.itemOrder.findUnique({
        where: { id },
      });

      if (!existingItemOrder) {
        throw new NotFoundException(`Item-Order with ID ${id} not found`);
      }

      return this.prisma.itemOrder.update({
        where: { id },
        data: updateItemOrderDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error updating Item-Order`);
      }
    }
  }

  async remove(id: string) {
    try {
      const item = await this.prisma.itemOrder.findUnique({ where: { id } });

      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }

      const product = await this.productService.findOne(item.productId);

      await this.productService.update(product.id, {
        stockQuantity: product.stockQuantity + item.quantity,
      });
      await this.prisma.itemOrder.delete({ where: { id } });

      return { message: 'Item-Order deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error deleting Item-Order`);
      }
    }
  }
}
