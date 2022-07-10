import React, { Component } from "react";
import styles from "./spinner.module.less";

// source: https://loading.io/css/

class Spinner extends Component<{}, {}> {
  render = () => {
    return (
      <div className={styles.ldsSpinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  };
}

export default Spinner;
