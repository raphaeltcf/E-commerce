import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateItemOrderDto {
  @ApiProperty({
    example: 'cc4e309a-85b3-11ee-b9d1-0242ac120002',
    description: `Informe o ID do pedido`,
  })
  @IsNotEmpty()
  readonly orderId: string;

  @ApiProperty({
    example: 'cc4e309a-85b3-11ee-b9d1-0242ac120002',
    description: `Informe o ID do Item`,
  })
  @IsNotEmpty()
  readonly productId: string;

  @ApiProperty({
    example: 1,
    description: `Informe a quantidade de Itens`,
  })
  @IsNotEmpty()
  readonly quantity: number;

  @ApiProperty({
    example: 100,
    description: `Informe o preço do Item`,
  })
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({
    example: 1000,
    description: `Informe o total dos Itens`,
  })
  @IsNotEmpty()
  readonly subtotal: number;
}
