/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from "react";
import { Text, View, Image } from "react-native";
import { Link } from "react-router-native";
import imgLogo from "static/images/logo.png";
import styles from "./Home.style";
import type { ReduxProps } from "./";

type Props = ReduxProps & {
  history: Object
};

class Home extends PureComponent<Props> {
  render() {
    return (
      <View style={styles.home}>
        {/*
        <div className={css.home}>
          <Helmet title="Home" />
          This is the app...
        <ul>
          <li>This is a test item</li>
        </ul>
        <Link to="/profile">
          <div className={Cn(img.logo, css.link)} />
        </Link>
        <Link to="/todos">
          <div className={Cn(sprites.facebookIcon, css.link)} />
        </Link>
        <RequireAuth>
          <button onClick={this.handleLogout}>Logout</button>
        </RequireAuth>
        </div>
        */}
        <Text style={styles.homeText}>This is the app...</Text>
        <Text style={styles.homeText}>This is a test item</Text>
        <Link to="/profile">
          <Image style={styles.link} source={imgLogo} />
        </Link>
        <Link to="/todos">
          <Image style={styles.link} source={imgLogo} />
        </Link>
      </View>
    );
  }
}

export default Home;
