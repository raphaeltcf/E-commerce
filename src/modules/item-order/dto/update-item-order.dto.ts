import { PartialType } from '@nestjs/mapped-types';
import { CreateItemOrderDto } from './create-item-order.dto';

export class UpdateItemOrderDto extends PartialType(CreateItemOrderDto) {}
