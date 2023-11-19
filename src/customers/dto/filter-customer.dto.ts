import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FilterCustomersDTO {
  @ApiProperty({
    example: 'Raphael torres',
    description: 'Filtrar por nome',
    required: false,
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: true,
    description: 'Filtrar por ativo ou inativo',
    required: false,
  })
  @IsOptional()
  active?: boolean;
}
