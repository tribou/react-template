// @flow

const Path = require("path");
const AssetsPlugin = require("assets-webpack-plugin");
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OfflinePlugin = require("offline-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const Webpack = require("webpack");
const vars = require("../../config/variables");

const offlinePluginConfig = require("../offlinePlugin.js");

const { NODE_ENV } = process.env;
const cacheDirectory = NODE_ENV === "development";

const plugins = [
  new MiniCssExtractPlugin(),
  new Webpack.HashedModuleIdsPlugin(),
  new WebpackChunkHash(),
  new CopyPlugin({
    patterns: [
      {
        from: "static",
        globOptions: { ignore: ["**/package.json", "**/.eslintrc*"] }
      }
    ]
  }),
  new AssetsPlugin({
    filename: "assets.json",
    path: Path.resolve(__dirname, "../../build")
  }),
  new ChunkManifestPlugin({
    filename: "../chunk-manifest.json",
    manifestVariable: vars.fobWebpackManiVar
  })
  // relative to project root
  // new FaviconsWebpackPlugin('static/images/logo@2x.png'),
];

if (NODE_ENV === "production") {
  plugins.push(
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|css|html|json|ico|map|xml|txt|svg|eot|otf|ttf|woff|woff2)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  );
  plugins.push(
    new Webpack.LoaderOptionsPlugin({
      debug: NODE_ENV === "development"
    })
  );
  // Keep OfflinePlugin last
  plugins.push(new OfflinePlugin(offlinePluginConfig));
}

const config = {
  plugins,
  target: "web",
  mode: NODE_ENV || "development",
  devtool: NODE_ENV === "development" ? "eval-source-map" : undefined,
  // platform: 'browser',
  entry: {
    bundle: [
      "sanitize.css/sanitize.css",
      "tachyons-clears",
      "tachyons-display",
      "tachyons-flexbox",
      "tachyons-position",
      "tachyons-spacing",
      "tachyons-text-align",
      "tachyons-vertical-align",
      "tachyons-widths",
      "./src/styles/fonts.css",
      "./src/styles/app.css",
      "./src/index.browser.js"
    ]
  },
  output: {
    path: Path.resolve(__dirname, "../../build/public/"),
    chunkFilename: "[name]-[chunkhash].js",
    filename: "[name]-[chunkhash].js",
    publicPath: "/static/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // Override .babelrc to avoid React Native config preset since it
          // affects HMR
          options: {
            cacheDirectory,
            babelrc: false,
            plugins: ["transform-class-properties", "transform-object-assign"],
            presets: [
              [
                "env",
                {
                  loose: true,
                  modules: false,
                  useBuiltIns: "entry"
                }
              ],
              "react",
              "stage-3"
            ]
          }
        }
      },
      {
        exclude: /node_modules/,
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName:
                  NODE_ENV === "production"
                    ? "[hash:base64:8]"
                    : "[path][name]__[local]__[hash:base64:3]"
              }
            }
          },
          "postcss-loader"
        ]
      },
      {
        exclude: undefined,
        test: /node_modules.*\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: false
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.(eot|otf)$/,
        use: "file-loader"
      },
      {
        test: /\.(mp4|webm)$/,
        use: "file-loader"
      },
      {
        test: /\.(gif|ico|jpg|jpeg|png|svg|webp)$/,
        use: "url-loader?limit=10000"
      },
      {
        test: /\.(woff|woff2)$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf)$/,
        use: "url-loader?limit=10000&mimetype=application/octet-stream"
      }
    ]
  },
  resolve: {
    extensions: [".web.js", ".js", ".json"],
    alias: {
      config: Path.resolve(__dirname, "../../config"),
      src: Path.resolve(__dirname, "../../src"),
      server: Path.resolve(__dirname, "../../server"),
      static: Path.resolve(__dirname, "../../static")
    }
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: "all"
      // chunks(chunk) {
      //   // exclude `my-excluded-chunk`
      //   return (
      //     !chunk.name.includes("webpack/hot") &&
      //     !chunk.name.includes("offline-plugin/runtime.js")
      //   );
      // }
    }
  }
};

module.exports = config;
