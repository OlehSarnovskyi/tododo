import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

const MAX_TEXT_LENGTH = 1000;

/**
 * Renaming is the only supported update. Scheduling and ownership are changed
 * through their own endpoints, so a task can never be reassigned by a patch.
 */
export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_TEXT_LENGTH)
  text: string;
}
