import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateItemOrderDto } from './interfaces/dto/create-item-order.dto';
import { UpdateItemOrderDto } from './interfaces/dto/update-item-order.dto';
import { OrderService } from 'src/modules/order/order.service';
import { ProductService } from 'src/modules/product/product.service';
import { Prisma } from '@prisma/client';
import { ItemOrderRepository } from './item-order.repository';
import { IItemOrder } from './interfaces/item-order.inteface';

@Injectable()
export class ItemOrderService {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
    private readonly itemOrderRepository: ItemOrderRepository,
  ) {}

  async create(data: CreateItemOrderDto): Promise<IItemOrder> {
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

        return await this.itemOrderRepository.create(itemOrderData);
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

  async findAll(): Promise<IItemOrder[]> {
    return await this.itemOrderRepository.findAll();
  }

  async findByOrderId(orderId: string): Promise<IItemOrder[]> {
    try {
      const order = await this.itemOrderRepository.findByOrderId(orderId);

      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      return order;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error with Order`);
      }
    }
  }

  async findOne(id: string): Promise<IItemOrder> {
    try {
      const itemOrder = await this.itemOrderRepository.findOne(id);

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

  async update(
    id: string,
    updateItemOrderDto: UpdateItemOrderDto,
  ): Promise<IItemOrder> {
    try {
      const existingItemOrder = await this.itemOrderRepository.findOne(id);

      if (!existingItemOrder) {
        throw new NotFoundException(`Item-Order with ID ${id} not found`);
      }

      return await this.itemOrderRepository.update(id, updateItemOrderDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException(`Error updating Item-Order`);
      }
    }
  }

  async remove(id: string): Promise<{
    message: string;
  }> {
    try {
      const item = await this.itemOrderRepository.findOne(id);

      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }

      const product = await this.productService.findOne(item.productId);

      await this.productService.update(product.id, {
        stockQuantity: product.stockQuantity + item.quantity,
      });
      await this.itemOrderRepository.remove(id);

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
