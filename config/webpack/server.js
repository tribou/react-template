// @flow

const Glob = require("glob");
const Path = require("path");
const Webpack = require("webpack");
const NodeExternals = require("webpack-node-externals");

const { NODE_ENV } = process.env;

const getEntry = () => {
  // construction inspired by:
  // https://github.com/webpack/webpack/issues/1189#issuecomment-156576084
  const serverEntry =
    NODE_ENV === "development" ? ["webpack/hot/poll?500"] : [];
  const entry = {
    "server.js": serverEntry.concat(["./server/index.js"])
  };

  // Get server layouts and web components for compilation
  // and place at build/layouts and build/components
  // since hapi-react-views requires templates at runtime
  const serverLayouts = Glob.sync("./server/views/!(*_test.js)*");
  serverLayouts.forEach(file => {
    const target = `views/${file.split("/").pop()}`;
    entry[target] = file;
  });

  return entry;
};

const plugins = [
  new Webpack.BannerPlugin({
    banner: 'require("source-map-support").install();',
    raw: true,
    entryOnly: false
  }),
  new Webpack.LoaderOptionsPlugin({
    debug: NODE_ENV === "development",
    minimize: NODE_ENV === "production"
  })
];

if (NODE_ENV === "development") {
  plugins.push(new Webpack.HotModuleReplacementPlugin());
}

// const config = createConfig([
const config = {
  plugins,
  target: "node",
  mode: NODE_ENV || "development",
  devtool: NODE_ENV === "development" ? "eval-source-map" : "source-map",
  entry: getEntry(),
  output: {
    path: Path.join(__dirname, "../../build"),
    filename: "[name]",
    libraryTarget: "commonjs2",
    publicPath: "/static/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
          // Override .babelrc to avoid React Native config preset since it
          // affects HMR
          // options: {
          //   cacheDirectory,
          //   babelrc: false,
          //   plugins: ["@babel/plugin-proposal-class-properties"],
          //   presets: [
          //     [
          //       "@babel/preset-env",
          //       {
          //         loose: true,
          //         modules: false,
          //         useBuiltIns: "entry",
          //         corejs: "3.6"
          //       }
          //     ],
          //     "@babel/preset-react",
          //     "@babel/preset-flow"
          //   ]
          // }
        }
      },
      {
        exclude: /node_modules/,
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              onlyLocals: true,
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
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          // 'style-loader',
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              onlyLocals: true
            }
          },
          "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      },
      {
        exclude: undefined,
        test: /node_modules.*\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              onlyLocals: true,
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
        test: /\.(svg)$/,
        use: "svg-inline-loader"
      },
      {
        test: /\.(mp4|webm)$/,
        use: "file-loader"
      },
      {
        test: /\.(gif|ico|jpg|jpeg|png|webp)$/,
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
  externals: [
    NodeExternals({
      whitelist: [/^webpack\/hot/]
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  }
};

module.exports = config;
