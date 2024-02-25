import { STATUS } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export interface IOrder {
  id: string;
  customerId: string;
  status: STATUS;
  total: Decimal;
  createdAt: Date;
  updatedAt: Date;
}
