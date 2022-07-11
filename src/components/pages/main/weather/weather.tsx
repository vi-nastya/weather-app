import React, { Component } from "react";
import { CITIES } from "constants/cities";
import { City } from "types/cities";
import { WeatherAPIResponse } from "types/weather";
import Spinner from "components/shared/spinner";
import TodayWeather from "components/pages/main/today-weather";
import styles from "./weather.module.less";
import DaysWeather from "components/pages/main/days-weather";
import { getWeekdayFromTimestamp } from "utils/utils";

type WeatherProps = {
  city: string;
};
type WeatherState = {
  weather: WeatherAPIResponse | null;
  isLoading: boolean;
  isError: boolean;
};

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
    this.setState({ weather: null, isError: false, isLoading: true });

    const currentCity = CITIES.find(
      (city) => city.name === this.props.city
    ) as City;

    const response = await fetch(
      `/.netlify/functions/weather?lat=${currentCity.lat}&lon=${currentCity.lon}`
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
