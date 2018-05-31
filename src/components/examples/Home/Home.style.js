// @flow
import { StyleSheet } from "react-native";
import $ from "config/variables";

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  homeText: {
    color: $.colorTheme
  },
  link: {
    marginBottom: 5
  }
});

export default styles;
