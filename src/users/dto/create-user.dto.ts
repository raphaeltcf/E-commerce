import {
  IsEmail,
<<<<<<< HEAD
  IsNotEmpty,
  IsOptional,
=======
  IsEnum,
  IsNotEmpty,
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  Matches,
  MinLength,
} from 'class-validator';
import { ROLE } from '@prisma/client';
<<<<<<< HEAD
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
=======

export class CreateUserDto {
  readonly id: number;

  @IsNotEmpty()
  readonly name: string;

>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

<<<<<<< HEAD
  @ApiProperty({
    example: 'nJvn99fNE$3m',
    description: `Informe uma senha forte para utilizar no login.`,
  })
=======
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  @IsNotEmpty()
  @MinLength(8, { message: 'A senha precisa ser maior ou igual a 8 my friend' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha tá bem fraquinha amigão',
  })
  readonly password: string;

<<<<<<< HEAD
  @ApiProperty({
    example: 'CUSTOMER|ADMIN',
    description: `Informe a role do usuário.`,
  })
  @IsOptional()
=======
  @IsEnum(ROLE)
>>>>>>> 57d835d8f37bf6c530068adf542e557f9950ed6e
  readonly type: ROLE;
}
