import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FilterProductsDTO {
  @ApiProperty({
    example: 'Cadeira Gamer',
    description: `Filtrar por nome de produto`,
    required: false,
  })
  @IsOptional()
  name?: string;

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

  @ApiProperty({
    example: 10,
    description: `Filtrar por estoque mínimo`,
    required: false,
  })
  @IsOptional()
  minStockQuantity?: number;

  @ApiProperty({
    example: 100,
    description: `Filtrar por estoque máximo`,
    required: false,
  })
  @IsOptional()
  maxStockQuantity?: number;

  @ApiProperty({
    example: 'chairs',
    description: `Filtrar por categoria`,
    required: false,
  })
  @IsOptional()
  category?: string;
}
