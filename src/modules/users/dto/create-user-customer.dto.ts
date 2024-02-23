import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';
import { ROLE } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'A senha precisa ser maior ou igual a 8 my friend' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha tá bem fraquinha amigão',
  })
  readonly password: string;

  @IsOptional()
  readonly type: ROLE;
}
