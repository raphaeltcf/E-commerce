import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';
import { ROLE } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Raphael Torres',
    description: `O nome será utilizado para qualquer coisa (Perfil, Home Page, etc) que precise exibir informações da pessoa conectada.`,
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'raphael@gmail.com',
    description: `Informe o email que será utilizado para o login.`,
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

  @ApiProperty({
    example: 'CUSTOMER|ADMIN',
    description: `Informe a role do usuário.`,
  })
  @IsOptional()
  readonly type: ROLE;
}
