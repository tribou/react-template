// @flow

const Path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const HtmlInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const Webpack = require("webpack");
const WebpackChunkHash = require("webpack-chunk-hash");

const {
  addPlugins,
  createConfig,
  env,
  setOutput,
  sourceMaps
  // eslint-disable-next-line import/no-extraneous-dependencies
} = require("@webpack-blocks/webpack2");

const babel = require("./blocks/babel");
const cssModules = require("./blocks/cssModules");
const eslint = require("./blocks/eslint");
const getEntry = require("./blocks/getEntry");
const getResolve = require("./blocks/getResolve");
const getTarget = require("./blocks/getTarget");
const setPlatform = require("./blocks/setPlatform");

const splitVendor = require("webpack-blocks-split-vendor");

const { NODE_ENV } = process.env;

const config = createConfig.vanilla([
  setPlatform("desktop"),
  getEntry(),
  getTarget(),
  splitVendor({
    name: "vendor",
    exclude: /(\/webpack\/hot\/|offline-plugin\/runtime\.js$)/
  }),
  setOutput({
    path: Path.resolve(__dirname, "../../build/desktop/"),
    chunkFilename: "[name]-[chunkhash].js",
    filename: "[name]-[chunkhash].js",
    publicPath: "./"
  }),
  babel(),
  getResolve(),
  cssModules(),
  addPlugins([
    new Webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV || "development")
      }
    }),
    new Webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new CopyPlugin(["static", "desktop/main.js", "desktop/package.json"]),
    new HtmlPlugin({
      inlineSource: ".css$",
      template: "desktop/index.html",
      filename: "index.html",
      chunks: ["vendor", "bundle"]
    }),
    new HtmlInlineSourcePlugin()
  ]),

  env("development", [sourceMaps(), eslint()]),

  env("production", [
    sourceMaps("source-map"),
    addPlugins([
      new UglifyJsPlugin({
        sourceMap: true
      }),
      new Webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true
      })
    ])
  ]),

  // custom configs
  (function getCustomLoadersBlock() {
    return context => {
      context.fileType.add({
        "application/x-misc-files": /\.(eot|otf)$/,
        "application/font-woff": /\.(woff|woff2)$/,
        "application/x-font-ttf": /\.(ttf)$/
      });

      return {
        module: {
          rules: [
            {
              test: context.fileType("application/x-misc-files"),
              use: "file-loader"
            },
            {
              test: context.fileType("video"),
              use: "file-loader"
            },
            {
              test: context.fileType("image"),
              use: "url-loader"
            },
            {
              test: context.fileType("application/font-woff"),
              use: "url-loader?mimetype=application/font-woff"
            },
            {
              test: context.fileType("application/x-font-ttf"),
              use: "url-loader?mimetype=application/octet-stream"
            }
          ]
        }
      };
    };
  })()
]);

module.exports = config;
