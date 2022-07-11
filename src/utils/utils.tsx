import { Weekday } from "types/weather";

export const getWeekdayFromTimestamp = (
  timestamp: number,
  timeZone: string
): Weekday =>
  new Date(timestamp * 1000).toLocaleString("en-US", {
    weekday: "short",
    timeZone,
  }) as Weekday;

export const capitalizeFirstLetter = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1)}`;
