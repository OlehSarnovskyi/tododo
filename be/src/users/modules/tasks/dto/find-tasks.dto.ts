import { IsNotEmpty, IsString } from 'class-validator';

export class FindTasksDto {
  @IsString()
  @IsNotEmpty()
  date: string;
}
