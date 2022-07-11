import { WeatherApiIconType } from "constants/icons";

export type Weather = {
  description: string;
  icon: WeatherApiIconType;
};

export type DailyWeather = {
  dt: number;
  temp: {
    day: number;
  };
  weather: Weather[];
};

export type WeatherAPIResponse = {
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    temp: number;
    weather: Weather[];
  };
  daily: Array<DailyWeather>;
};

export type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
