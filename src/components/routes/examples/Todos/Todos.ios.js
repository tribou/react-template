/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import type { ContextRouter } from "react-router-native";
import type { ReduxProps } from "./";

type Props = ReduxProps & ContextRouter;

class Todos extends PureComponent<Props> {
  render() {
    const { history } = this.props;
    return (
      <View style={styles.container}>
        <Button title="Back" onPress={history.goBack} />
        <Text style={styles.welcome}>Welcome to the Todos!</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default Todos;
