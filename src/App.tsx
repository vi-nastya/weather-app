import React, { Component } from "react";
import "./App.less";
import Cities from "./components/cities";
import Weather from "./components/weather";
import { CITIES } from "./constants/cities";

type AppProps = {
  children?: React.ReactNode;
};
type AppState = {
  city: string;
};

class App extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      city: CITIES[0].name,
    };
  }

  setCity = (newCity: string) => this.setState({ city: newCity });

  render = () => {
    return (
      <div className="App">
        <div className="container">
          <Cities city={this.state.city} onCityChange={this.setCity} />
          <Weather city={this.state.city} />
        </div>
      </div>
    );
  };
}

export default App;
