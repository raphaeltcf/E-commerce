import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    example: 'Raphael Ferreira',
    description: `Nome que está no cartão`,
  })
  @IsNotEmpty()
  readonly customerName: string;

  @ApiProperty({
    example: 'cc4e309a-85b3-11ee-b9d1-0242ac120002',
    description: `ID para referenciar o Pedido.`,
  })
  @IsNotEmpty()
  readonly orderId: string;

  @ApiProperty({
    example: '4024007192526902',
    description: `Numero do cartão`,
  })
  @IsNotEmpty()
  readonly cardNumber: string;

  @ApiProperty({
    example: 'Visa',
    description: `Bandeira do cartão`,
  })
  @IsNotEmpty()
  readonly cardType: string;

  @ApiProperty({
    example: '12',
    description: `Mês de espiração do cartão`,
  })
  @IsNotEmpty()
  readonly expiryMonth: number;

  @ApiProperty({
    example: '24',
    description: `ano de espiração do cartão`,
  })
  @IsNotEmpty()
  readonly expiryYear: number;

  @IsNotEmpty()
  @ApiProperty({
    example: '112',
    description: `Numero do cvv do cartão`,
  })
  @Length(3, 3, {
    message: 'O CVV deve ter exatamente 3 dígitos.',
  })
  readonly cvv: string;
}
