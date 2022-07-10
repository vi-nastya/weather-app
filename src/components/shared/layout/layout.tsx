import React, { Component } from "react";
import styles from "./layout.module.less";

type LayoutProps = {
  children?: React.ReactNode;
};

class Layout extends Component<LayoutProps, {}> {
  render = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>{this.props.children}</div>
      </div>
    );
  };
}

export default Layout;
