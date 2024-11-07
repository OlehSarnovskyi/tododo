import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateTaskDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number

  @IsString()
  @IsNotEmpty()
  date: string

  @IsString()
  @IsNotEmpty()
  text: string
}
