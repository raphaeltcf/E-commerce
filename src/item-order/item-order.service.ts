import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateItemOrderDto } from './dto/create-item-order.dto';
import { UpdateItemOrderDto } from './dto/update-item-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ItemOrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
  ) {}

  async create(data: CreateItemOrderDto) {
    const product = await this.productService.findOne(data.productId);

    if (product) {
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
    }
  }

  findAll() {
    return this.prisma.itemOrder.findMany();
  }

  findOne(id: string) {
    return this.prisma.itemOrder.findUnique({ where: { id } });
  }

  update(id: string, updateItemOrderDto: UpdateItemOrderDto) {
    return this.prisma.itemOrder.update({
      where: { id },
      data: updateItemOrderDto,
    });
  }

  async remove(id: string) {
    const item = await this.prisma.itemOrder.findUnique({ where: { id } });

    if (item) {
      const product = await this.productService.findOne(item.productId);

      await this.productService.update(product.id, {
        stockQuantity: product.stockQuantity + item.quantity,
      });
      return this.prisma.itemOrder.delete({ where: { id } });
    }
  }
}
