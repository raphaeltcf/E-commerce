<<<<<<< HEAD
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Cadeira Gamer',
    description: `Informe o nome do produto`,
  })
=======
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateProductDto {
  readonly id: number;

>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  @MinLength(4, { message: 'O nome do produto precisa ter mais que 4 letras' })
  @IsNotEmpty()
  readonly name: string;

<<<<<<< HEAD
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
=======
  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly price: number;

>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  @IsNotEmpty()
  readonly stockQuantity: number;
}
