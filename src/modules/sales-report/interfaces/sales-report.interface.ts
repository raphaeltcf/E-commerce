import { Decimal, JsonValue } from '@prisma/client/runtime/library';

export interface ISalesReport {
  id: string;
  period: JsonValue;
  total: Decimal;
  products: Decimal;
  path: string;
  createdAt: Date;
  updatedAt: Date;
}
