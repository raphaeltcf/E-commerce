import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEmailDto {
  @ApiProperty({
    example: 'raphael@gmail.com',
    description: `Email que será enviado o email!`,
  })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'Seja bem vindo a Loomi Store',
    description: `Titulo do email`,
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: 'Parabéns! Você foi selecionado para trabalhar na Loomi Store',
    description: `Informe o conteúdo do mensagem`,
  })
  @IsNotEmpty()
  readonly body: string;
}
