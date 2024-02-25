import { Decimal } from '@prisma/client/runtime/library';

export interface ITransaction {
  id: string;
  orderId: string;
  customerName: string;
  cardType: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: number;
  amount: Decimal;
  createdAt: Date;
  updatedAt: Date;
}
