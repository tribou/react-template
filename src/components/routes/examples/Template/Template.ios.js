/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from "react";
import { Text, View } from "react-native";
import { type ContainerProps } from "./";
import s from "./Template.style";

type Props = ContainerProps & {};
type State = {};

export default class Template extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={s.container}>
        <Text style={s.welcome}>Welcome to React Native!</Text>
        <Text style={s.instructions}>To get started, edit index.ios.js</Text>
        <Text style={s.instructions}>
          Press Cmd+R to reload,{"\n"}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}
