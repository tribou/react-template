/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from "react";
import { Text, View } from "react-native";
import type { ContainerProps } from "./";
import styles from "./Template.style";

type Props = ContainerProps & {};
type State = {};

export default class Template extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{"\n"}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}
