import { Decimal } from '@prisma/client/runtime/library';

export interface IItemOrder {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: Decimal;
  subtotal: Decimal;
  createdAt: Date;
  updatedAt: Date;
}
