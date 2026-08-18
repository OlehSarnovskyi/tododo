import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsMongoId,
  Min,
  ValidateNested,
} from 'class-validator';

export class ReorderTaskItemDto {
  @IsMongoId()
  _id: string;

  @IsInt()
  @Min(0)
  order: number;
}

export class ReorderTasksDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ReorderTaskItemDto)
  tasks: ReorderTaskItemDto[];
}
