import React, { Component } from "react";
import { WeatherApiIconType, WEATHER_ICONS } from "icons";
import styles from "./today-weather.module.less";

type TodayWeatherProps = {
  temperature: number;
  description: string;
  icon: WeatherApiIconType;
};

const capitalizeFirstLetter = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1)}`;

class TodayWeather extends Component<TodayWeatherProps, {}> {
  render = () => {
    const CurrentWeatherIcon = WEATHER_ICONS[this.props.icon];

    return (
      <div className={styles.today}>
        <span className={styles.title}>Today</span>
        <div className={styles.info}>
          <CurrentWeatherIcon className={styles.icon} />
          <div className={styles.weather}>
            <span
              className={styles.temperature}
            >{`${this.props.temperature}°`}</span>
            <span className={styles.description}>
              {capitalizeFirstLetter(this.props.description)}
            </span>
          </div>
        </div>
      </div>
    );
  };
}

export default TodayWeather;
