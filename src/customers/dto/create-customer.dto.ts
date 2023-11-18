<<<<<<< HEAD
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'cc4e309a-85b3-11ee-b9d1-0242ac120002',
    description: `Informe o ID do usuario`,
  })
  readonly userId: string;

  @ApiProperty({
    example: 'Raphael Torres Cavalcanti Ferreira',
    description: `Informe o nome completo do usuario`,
  })
  @IsNotEmpty()
  readonly fullName: string;

  @ApiProperty({
    example: '(81) 997546494',
    description: `Informe o numero para contato do usuario`,
  })
  @Matches(
    /^(?:(?:\+|00)?(55)\s?)?(\(?[1-9]{2}\)?\s?)(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/,
    {
      message: 'O número de telefone não é válido.',
    },
  )
  @IsNotEmpty()
  readonly contact: string;

  @ApiProperty({
    example: 'Rua são sebastião, 741. água Fria, Recife-PE',
    description: `Informe o ID do usuario`,
  })
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({
    example: 'Ativo',
    description: `Informe o Status do  usuario`,
  })
=======
import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  readonly id: number;

  readonly userId: number;

  @IsNotEmpty()
  readonly fullName: string;

  @IsNotEmpty()
  readonly contact: string;

  @IsNotEmpty()
  readonly address: string;

>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  @IsNotEmpty()
  readonly status: boolean;
}
