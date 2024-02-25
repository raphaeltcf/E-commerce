import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Matches } from 'class-validator';

export class FilterSalesReportDto {
  @ApiProperty({
    example: '14/11/2023',
    description: 'Selecione a data minima para o relatorio',
    required: false,
  })
  @IsOptional()
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'Data: Exemplo de Uso:14/11/2023',
  })
  minDate?: string;

  @ApiProperty({
    example: '21/11/2023',
    description: 'Selecione a data máxima para o relatorio',
    required: false,
  })
  @IsOptional()
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'Data: Exemplo de Uso: 21/11/2023',
  })
  maxDate?: string;
}
