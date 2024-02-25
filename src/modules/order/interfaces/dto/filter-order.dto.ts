import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '@prisma/client';
import { IsEnum, IsOptional, Matches } from 'class-validator';

export class FilterOrderDTO {
  @ApiProperty({
    example: 'RECEBIDO|PREPARO|DESPACHADO|ENTREGUE',
    description: 'Filtrar por STATUS do pedido',
    required: false,
  })
  @IsOptional()
  @IsEnum(STATUS)
  status?: STATUS;

  @ApiProperty({
    example: '100',
    description: 'Filtrar por preço máximo total',
    required: false,
  })
  @IsOptional()
  maxPrice?: string;

  @ApiProperty({
    example: '10',
    description: 'Filtrar por preço mínimo total',
    required: false,
  })
  @IsOptional()
  minPrice?: string;

  @ApiProperty({
    example: '10/10/2010',
    description: 'Filtra por data minima',
    required: false,
  })
  @IsOptional()
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'Data: Exemplo de Uso: 10/10/2010',
  })
  minDate?: string;

  @ApiProperty({
    example: '10/10/2010',
    description: 'Filtra por data maxima',
    required: false,
  })
  @IsOptional()
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'Data: Exemplo de Uso: 10/10/2010',
  })
  maxDate?: string;
}
