// @flow
const { NODE_ENV } = process.env;

if (NODE_ENV !== "development" && NODE_ENV !== "production") {
  process.env.NODE_ENV = "production";
}

const browser = require("./config/webpack/browser");
const server = require("./config/webpack/server");

module.exports = [browser, server];
