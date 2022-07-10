import React, { Component } from "react";
import Cities from "components/pages/main/cities";
import Weather from "components/pages/main/weather";
import Layout from "components/shared/layout";
import { CITIES } from "constants/cities";

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
      <Layout>
        <Cities city={this.state.city} onCityChange={this.setCity} />
        <Weather city={this.state.city} />
      </Layout>
    );
  };
}

export default App;
