import { Matches } from 'class-validator';

export class FindOpenTasksDto {
  /**
   * The client's own "today". The server runs in UTC, so deriving it here
   * would put the day boundary in the wrong place for most users.
   */
  @Matches(/^\d{2}\.\d{2}\.\d{4}$/, { message: 'today must be in DD.MM.YYYY format.' })
  today: string;
}
