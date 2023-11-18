import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Cadeira Gamer',
    description: `Informe o nome do produto`,
  })
  @MinLength(4, { message: 'O nome do produto precisa ter mais que 4 letras' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'Cadeira Gamer RGD REGULAVEL',
    description: `Informe a descrição do produto`,
  })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    example: 10,
    description: `Informe o preço do produto`,
  })
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({
    example: 10,
    description: `Informe a quantidade no estoque`,
  })
  @IsNotEmpty()
  readonly stockQuantity: number;
}
