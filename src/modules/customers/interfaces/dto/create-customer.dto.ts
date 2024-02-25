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
      message: 'O número de telefone não é válido. USO: (XX) XXXXXXXXXX',
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
  @IsNotEmpty()
  readonly status: boolean;
}
