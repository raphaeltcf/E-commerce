import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSalesReportDto {
  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  products: number;

  @IsOptional()
  path: string;
}
