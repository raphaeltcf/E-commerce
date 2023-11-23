import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FilterTransactionsDTO {
  @ApiProperty({
    example: 'Raphael torres',
    description: 'Filtrar por nome no cartão',
    required: false,
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'Visa',
    description: 'Filtrar por Bandeira do cartão',
    required: false,
  })
  @IsOptional()
  cardType?: string;

  @ApiProperty({
    example: 10,
    description: `Filtrar por preço mínimo`,
    required: false,
  })
  @IsOptional()
  minPrice?: number;

  @ApiProperty({
    example: 100,
    description: `Filtrar por preço máximo`,
    required: false,
  })
  @IsOptional()
  maxPrice?: number;
}
