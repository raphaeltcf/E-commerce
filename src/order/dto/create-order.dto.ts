import { OrderStatus } from '../enum/order.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  readonly id: number;

  readonly idCustomer: number;

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNotEmpty()
  total: number;
}
