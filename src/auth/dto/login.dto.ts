import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'raphael@gmail.com',
    description: `Email utilizado no cadastro!`,
  })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'nJvn99fNE$3m',
    description: `Senha utilizada no cadastro`,
  })
  @IsNotEmpty()
  readonly password: string;
}
