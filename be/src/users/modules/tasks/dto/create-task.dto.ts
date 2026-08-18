import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

const MAX_TEXT_LENGTH = 1000;

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_TEXT_LENGTH)
  text: string;
}
