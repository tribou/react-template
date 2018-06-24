// @flow
//
// This file allows styles to be shared across iOS and Android even if the
// logic needs to be different
import { StyleSheet } from "react-native";
import $ from "config/variables";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: $.colorWhite
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: $.colorDark,
    marginBottom: 5
  }
});

export default styles;
