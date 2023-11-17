import { IsNotEmpty } from 'class-validator';

export class CreateItemOrderDto {
  readonly id: number;

  readonly orderId: number;

  readonly productId: number;

  @IsNotEmpty()
  readonly quantity: number;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly subtotal: number;
}
