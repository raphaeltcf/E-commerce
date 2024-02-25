import { Decimal } from '@prisma/client/runtime/library';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price: Decimal;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}
