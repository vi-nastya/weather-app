import React from "react";
import "./App.less";
import weatherIcons from "./icons";

const Icon = weatherIcons["02d"];

const CITIES = ["Ottawa", "Moscow", "Tokyo"];
const DAYS = [
  {
    dayOfWeek: "Wed",
    icon: Icon,
    temperature: 18,
  },
  {
    dayOfWeek: "Thu",
    icon: Icon,
    temperature: 19,
  },
  {
    dayOfWeek: "Fri",
    icon: Icon,
    temperature: 20,
  },
  {
    dayOfWeek: "Sat",
    icon: Icon,
    temperature: 21,
  },
];

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="cities">
          {CITIES.map((city) => (
            <button key={city} className="city">
              {city.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="weather">
          <div className="today">
            <span className="today-title">Today</span>
            <div className="today-info">
              <Icon className="today-icon" />
              <div className="today-weather">
                <span className="today-temperature">{`19°`}</span>
                <span className="today-description">Clouds</span>
              </div>
            </div>
          </div>
          <div className="days">
            {DAYS.map(({ dayOfWeek, icon: Icon, temperature }, index) => (
              <div key={index} className="day">
                <span className="day-week">{dayOfWeek}</span>
                <Icon className="day-icon" />
                <span className="day-temperature">{`${temperature}°`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
