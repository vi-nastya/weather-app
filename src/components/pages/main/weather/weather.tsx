import React, { Component } from "react";
import { CITIES } from "constants/cities";
import { WEATHER_ICONS } from "icons";
import { City } from "types/cities";
import { WeatherAPIResponse } from "types/weather";
import Spinner from "components/shared/spinner";
import TodayWeather from "components/pages/main/today-weather";
import styles from "./weather.module.less";

const WEATHER_API = "https://api.openweathermap.org/data/3.0/onecall";
const API_APP_ID = process.env.REACT_APP_WEATHER_APPID;

type WeatherProps = {
  city: string;
};
type WeatherState = {
  weather: WeatherAPIResponse | null;
  isLoading: boolean;
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
    let daysData = null;
    if (this.state.weather) {
      daysData = this.state.weather.daily.slice(1, 5).map((item) => ({
        weekday: getWeekdayFromTimestamp(item.dt, this.state.weather!.timezone),
        icon: WEATHER_ICONS[item.weather[0].icon],
        temperature: Math.round(item.temp.day),
      }));
    }

    if (!this.state.weather) {
      return <Spinner />;
    }

    return (
      <div className={styles.wrapper}>
        <TodayWeather
          temperature={Math.round(this.state.weather.current.temp)}
          icon={this.state.weather.current.weather[0].icon}
          description={this.state.weather.current.weather[0].description}
        />
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
