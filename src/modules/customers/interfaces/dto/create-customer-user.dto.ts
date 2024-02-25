import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateCustomerUserDto {
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
    example: 'raphaeltcferreira@gmail.com',
    description: `Informe o E-mail do usuario`,
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'nJvn99fNE$3m',
    description: `Informe uma senha forte para utilizar no login.`,
  })
  @IsNotEmpty()
  @MinLength(8, { message: 'A senha precisa ser maior ou igual a 8 my friend' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha tá bem fraquinha amigão',
  })
  readonly password: string;
}
