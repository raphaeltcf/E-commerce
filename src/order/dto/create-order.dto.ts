import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 'cc4e309a-85b3-11ee-b9d1-0242ac120002',
    description: `ID para referenciar o Cliente responsável pelo pedido.`,
  })
  @IsNotEmpty()
  readonly customerId: string;

  @IsOptional()
  @IsEnum(STATUS)
  readonly status?: STATUS;

  @IsOptional()
  readonly total?: number;
}
