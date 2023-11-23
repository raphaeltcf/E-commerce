import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

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
  @IsOptional()
  readonly quantity: number;

  @IsOptional()
  readonly price: number;

  @IsOptional()
  readonly subtotal: number;
}
