import React, { Component } from "react";
import { CITIES } from "constants/cities";
import { City } from "types/cities";
import { WeatherAPIResponse, Weekday } from "types/weather";
import Spinner from "components/shared/spinner";
import TodayWeather from "components/pages/main/today-weather";
import styles from "./weather.module.less";
import DaysWeather from "components/pages/main/days-weather";

const WEATHER_API = "https://api.openweathermap.org/data/3.0/onecall";
const API_APP_ID = process.env.REACT_APP_WEATHER_APPID;

type WeatherProps = {
  city: string;
};
type WeatherState = {
  weather: WeatherAPIResponse | null;
  isLoading: boolean;
  isError: boolean;
};

const getWeekdayFromTimestamp = (
  timestamp: number,
  timeZone: string
): Weekday =>
  new Date(timestamp * 1000).toLocaleString("en-US", {
    weekday: "short",
    timeZone,
  }) as Weekday;

class Weather extends Component<WeatherProps, WeatherState> {
  constructor(props: any) {
    super(props);
    this.state = {
      weather: null,
      isLoading: false,
      isError: false,
    };
  }

  fetchWeather = async () => {
    const getData = (city: City) =>
      fetch(
        `${WEATHER_API}?lat=${city.lat}&lon=${city.lon}&exclude=minutely,hourly,alerts&appid=${API_APP_ID}&units=metric`
      );

    this.setState({ weather: null, isError: false, isLoading: true });

    const response = await getData(
      CITIES.find((city) => city.name === this.props.city) as City
    );

    if (response.status !== 200) {
      this.setState({ isError: true, isLoading: false, weather: null });
      return;
    }

    const weatherData = await response.json();

    this.setState({ weather: weatherData, isLoading: false, isError: false });
  };

  componentDidMount() {
    this.fetchWeather();
  }

  componentDidUpdate(prevProps: WeatherProps) {
    if (this.props.city !== prevProps.city) {
      this.fetchWeather();
    }
  }

  render = () => {
    if (this.state.isError) {
      return (
        <div className={`${styles.wrapper} ${styles.wrapperEmpty}`}>
          <span className={styles.error}>Something went wrong</span>
        </div>
      );
    }

    const weather = this.state.weather;
    if (this.state.isLoading || !weather) {
      return (
        <div className={`${styles.wrapper} ${styles.wrapperEmpty}`}>
          <Spinner />
        </div>
      );
    }

    const daysData = weather.daily.slice(1, 5).map((item) => ({
      weekday: getWeekdayFromTimestamp(item.dt, this.state.weather!.timezone),
      icon: item.weather[0].icon,
      temperature: Math.round(item.temp.day),
    }));

    return (
      <div className={styles.wrapper}>
        <TodayWeather
          temperature={Math.round(weather.current.temp)}
          icon={weather.current.weather[0].icon}
          description={weather.current.weather[0].description}
        />
        <DaysWeather days={daysData} />
      </div>
    );
  };
}

export default Weather;
