import React, { Component } from "react";
import "./App.less";
import { WEATHER_ICONS, WeatherApiIconType } from "./icons";

const WEATHER_API = "https://api.openweathermap.org/data/3.0/onecall";
const API_APP_ID = process.env.REACT_APP_WEATHER_APPID;

type City = {
  name: string;
  lat: number;
  lon: number;
};

const CITIES: City[] = [
  {
    name: "Vancouver",
    lat: 49.2827,
    lon: -123.1207,
  },
  {
    name: "Tokyo",
    lat: 35.6762,
    lon: -139.6503,
  },
  {
    name: "London",
    lat: 51.5072,
    lon: 0.1276,
  },
];

type AppProps = {
  children?: React.ReactNode;
};
type AppState = {
  city: string;
  weather: APIResponse | null;
};

type Weather = {
  description: string;
  icon: WeatherApiIconType;
};

type DailyWeather = {
  dt: number;
  temp: {
    day: number;
  };
  weather: Weather[];
};

type APIResponse = {
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    temp: number;
    weather: Weather[];
  };
  daily: Array<DailyWeather>;
};

const getWeekdayFromTimestamp = (timestamp: number, timeZone: string): string =>
  new Date(timestamp * 1000).toLocaleString("en-US", {
    weekday: "short",
    timeZone,
  });

class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      city: CITIES[0].name,
      weather: null,
    };
  }

  fetchWeather() {
    const getData = (city: City) =>
      fetch(
        `${WEATHER_API}?lat=${city.lat}&lon=${city.lon}&exclude=minutely,hourly,alerts&appid=${API_APP_ID}&units=metric`
      );

    this.setState({ weather: null });
    getData(CITIES.find((city) => city.name === this.state.city) as City)
      .then((response) => response.json())
      .then((weatherData) => {
        this.setState({ weather: weatherData });
      });
  }

  componentDidMount() {
    this.fetchWeather();
  }

  componentDidUpdate(prevProps: AppProps, prevState: AppState) {
    if (this.state.city !== prevState.city) {
      this.fetchWeather();
    }
  }

  setCity = (newCity: string) => this.setState({ city: newCity });

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

    return (
      <div className="App">
        <div className="container">
          <div className="cities">
            {CITIES.map(({ name }) => (
              <button
                key={name}
                className={`city ${
                  this.state.city === name ? "city-active" : ""
                }`}
                disabled={this.state.city === name}
                onClick={() => this.setCity(name)}
              >
                {name.toUpperCase()}
              </button>
            ))}
          </div>
          {!this.state.weather ? (
            "NO WEATHER"
          ) : (
            <div className="weather">
              <div className="today">
                <span className="today-title">Today</span>
                <div className="today-info">
                  {CurrentWeatherIcon && (
                    <CurrentWeatherIcon className="today-icon" />
                  )}
                  <div className="today-weather">
                    <span className="today-temperature">{`${Math.round(
                      this.state.weather.current.temp
                    )}°`}</span>
                    <span className="today-description">
                      {this.state.weather.current.weather[0].description}
                    </span>
                  </div>
                </div>
              </div>
              <div className="days">
                {daysData &&
                  daysData.map(
                    ({ weekday, icon: Icon, temperature }, index) => (
                      <div key={index} className="day">
                        <span className="day-weekday">{weekday}</span>
                        <Icon className="day-icon" />
                        <span className="day-temperature">{`${temperature}°`}</span>
                      </div>
                    )
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
}

export default App;
