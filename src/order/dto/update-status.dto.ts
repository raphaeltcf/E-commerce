import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({
    example: 'AGUARDANDO|RECEBIDO|PREPARO|ENTREGUE',
    description: 'Atualizar o STATUS do pedido',
  })
  @IsNotEmpty()
  status: STATUS;
}
