import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  readonly id: string;

  @ApiProperty({
    example: 'cc4e309a-85b3-11ee-b9d1-0242ac120002',
    description: `ID para referenciar o Cliente responsável pelo pedido.`,
  })
  @IsNotEmpty()
  readonly customerId: string;

  @ApiProperty({
    example: 'RECEBIDO|PREPARO|DESPACHADO|ENTREGUE',
    description: `Status atual do pedido.`,
  })
  @IsNotEmpty()
  @IsEnum(STATUS)
  readonly status: STATUS;

  @ApiProperty({
    example: 10.99,
    description: `Valor Total do pedido`,
  })
  @IsNotEmpty()
  readonly total: number;
}
