import { IsEnum } from 'class-validator';
import { StatusEnum } from '../models/status.enum';

export class UpdateStatusDto {
  @IsEnum(StatusEnum)
  status: StatusEnum;
}
