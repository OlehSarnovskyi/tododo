import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MoveTaskDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  date: string;
}
