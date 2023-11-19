import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class FilterOrderDTO {
  @ApiProperty({
    example: 'AGUARDANDO|RECEBIDO|PREPARO|ENTREGUE',
    description: 'Filtrar por STATUS do pedido',
    required: false,
  })
  @IsOptional()
  status?: STATUS;

  @ApiProperty({
    example: '100',
    description: 'Filtrar por preço máximo total',
    required: false,
  })
  @IsOptional()
  maxPrice?: number;

  @ApiProperty({
    example: '10',
    description: 'Filtrar por preço minimo total',
    required: false,
  })
  @IsOptional()
  minPrice?: number;

  @ApiProperty({
    example: '10/10/2010',
    description: 'Filtra por data minima',
    required: false,
  })
  @IsOptional()
  minDate?: Date;

  @ApiProperty({
    example: '10/10/2010',
    description: 'Filtra por data maxima',
    required: false,
  })
  @IsOptional()
  maxDate?: Date;
}
