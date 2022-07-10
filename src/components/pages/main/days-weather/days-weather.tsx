import React, { Component } from "react";
import { WeatherApiIconType, WEATHER_ICONS } from "icons";
import styles from "./days-weather.module.less";
import { Weekday } from "types/weather";

type DayWeather = {
  weekday: Weekday;
  temperature: number;
  icon: WeatherApiIconType;
};

type DaysWeatherProps = {
  days: DayWeather[];
};

class DaysWeather extends Component<DaysWeatherProps, {}> {
  render = () => {
    return (
      <div className={styles.wrapper}>
        {this.props.days.map(({ weekday, icon, temperature }, index) => {
          const Icon = WEATHER_ICONS[icon];

          return (
            <div key={index} className={styles.day}>
              <span className={styles.weekday}>{weekday}</span>
              <Icon className={styles.icon} />
              <span className={styles.temperature}>{`${temperature}°`}</span>
            </div>
          );
        })}
      </div>
    );
  };
}

export default DaysWeather;
