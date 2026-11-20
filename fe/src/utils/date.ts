import dayjs, { Dayjs } from "dayjs";

/** Parses the DD.MM.YYYY wire format without pulling in customParseFormat. */
export function parseTaskDate(value: string): Dayjs {
  const [day, month, year] = value.split(".");
  return dayjs(`${year}-${month}-${day}`);
}
