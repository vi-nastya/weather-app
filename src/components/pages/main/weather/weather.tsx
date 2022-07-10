import React, { Component } from "react";
import { CITIES } from "../../../../constants/cities";
import { WEATHER_ICONS } from "../../../../icons";
import { City } from "../../../../types/cities";
import { WeatherAPIResponse } from "../../../../types/weather";
import styles from "./weather.module.less";

const WEATHER_API = "https://api.openweathermap.org/data/3.0/onecall";
const API_APP_ID = process.env.REACT_APP_WEATHER_APPID;

type WeatherProps = {
  city: string;
};
type WeatherState = {
  weather: WeatherAPIResponse | null;
};

const getWeekdayFromTimestamp = (timestamp: number, timeZone: string): string =>
  new Date(timestamp * 1000).toLocaleString("en-US", {
    weekday: "short",
    timeZone,
  });

class Weather extends Component<WeatherProps, WeatherState> {
  constructor(props: any) {
    super(props);
    this.state = {
      weather: null,
    };
  }

  fetchWeather() {
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
    const CurrentWeatherIcon = this.state.weather
      ? WEATHER_ICONS[this.state.weather.current.weather[0].icon]
      : null;

    let daysData = null;
    if (this.state.weather) {
      daysData = this.state.weather.daily.slice(1, 5).map((item) => ({
        weekday: getWeekdayFromTimestamp(item.dt, this.state.weather!.timezone),
        icon: WEATHER_ICONS[item.weather[0].icon],
        temperature: Math.round(item.temp.day),
      }));
    }

    if (!this.state.weather) {
      return <div>TODO: LOADER</div>;
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.today}>
          <span className={styles.todayTitle}>Today</span>
          <div className={styles.todayInfo}>
            {CurrentWeatherIcon && (
              <CurrentWeatherIcon className={styles.todayIcon} />
            )}
            <div className={styles.todayWeather}>
              <span className={styles.todayTemperature}>{`${Math.round(
                this.state.weather.current.temp
              )}°`}</span>
              <span className={styles.todayDescription}>
                {this.state.weather.current.weather[0].description}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.days}>
          {daysData &&
            daysData.map(({ weekday, icon: Icon, temperature }, index) => (
              <div key={index} className={styles.day}>
                <span className={styles.dayWeekday}>{weekday}</span>
                <Icon className={styles.dayIcon} />
                <span
                  className={styles.dayTemperature}
                >{`${temperature}°`}</span>
              </div>
            ))}
        </div>
      </div>
    );
  };
}

export default Weather;
