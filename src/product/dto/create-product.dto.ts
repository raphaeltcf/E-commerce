import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateProductDto {
  readonly id: number;

  @MinLength(4, { message: 'O nome do produto precisa ter mais que 4 letras' })
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly stockQuantity: number;
}
