import React, { Component } from "react";
import { CITIES } from "constants/cities";
import styles from "./cities.module.less";

type CitiesProps = {
  city: string;
  onCityChange: (city: string) => void;
};

class Cities extends Component<CitiesProps> {
  render = () => {
    return (
      <div className={styles.cities}>
        {CITIES.map(({ name }) => (
          <button
            key={name}
            className={`${styles.city} ${
              this.props.city === name ? styles.cityActive : ""
            }`}
            disabled={this.props.city === name}
            onClick={() => this.props.onCityChange(name)}
          >
            {name.toUpperCase()}
          </button>
        ))}
      </div>
    );
  };
}

export default Cities;
