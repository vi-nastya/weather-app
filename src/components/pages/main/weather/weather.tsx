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
    };
  }

  fetchWeather() {
    this.setState({ isLoading: true });
    const getData = (city: City) =>
      fetch(
        `${WEATHER_API}?lat=${city.lat}&lon=${city.lon}&exclude=minutely,hourly,alerts&appid=${API_APP_ID}&units=metric`
      );

    this.setState({ weather: null });
    getData(CITIES.find((city) => city.name === this.props.city) as City)
      .then((response) => response.json())
      .then((weatherData) => {
        this.setState({ weather: weatherData });
      });
    this.setState({ isLoading: false });
  }

  componentDidMount() {
    this.fetchWeather();
  }

  componentDidUpdate(prevProps: WeatherProps) {
    if (this.props.city !== prevProps.city) {
      this.fetchWeather();
    }
  }

  render = () => {
    if (!this.state.weather) {
      return (
        <div className={`${styles.wrapper} ${styles.wrapperEmpty}`}>
          <Spinner />
        </div>
      );
    }

    const daysData = this.state.weather.daily.slice(1, 5).map((item) => ({
      weekday: getWeekdayFromTimestamp(item.dt, this.state.weather!.timezone),
      icon: item.weather[0].icon,
      temperature: Math.round(item.temp.day),
    }));

    return (
      <div className={styles.wrapper}>
        <TodayWeather
          temperature={Math.round(this.state.weather.current.temp)}
          icon={this.state.weather.current.weather[0].icon}
          description={this.state.weather.current.weather[0].description}
        />
        <DaysWeather days={daysData} />
      </div>
    );
  };
}

export default Weather;
