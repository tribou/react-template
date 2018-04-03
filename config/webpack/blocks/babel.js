// @flow

function babel() {
  // eslint-disable-next-line arrow-parens
  return (context /* : Object */) => {
    const { NODE_ENV } = process.env;
    const cacheDirectory = NODE_ENV === "development";

    return {
      module: {
        rules: [
          {
            test: context.fileType("application/javascript"),
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              // Override .babelrc to avoid React Native config preset since it
              // affects HMR
              options: {
                cacheDirectory,
                babelrc: false,
                plugins: [
                  "transform-class-properties",
                  "transform-object-assign"
                ],
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
          }
        ]
      }
    };
  };
}

module.exports = babel;
