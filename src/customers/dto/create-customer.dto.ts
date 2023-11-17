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

  @IsNotEmpty()
  readonly status: boolean;
}
