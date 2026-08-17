import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { StatusEnum } from '../models/status.enum';

export class UpdateStatusDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsEnum(StatusEnum)
  status: StatusEnum;
}
