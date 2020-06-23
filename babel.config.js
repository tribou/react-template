module.exports = function(api) {
  if (api.env("test")) {
    return {
      plugins: [
        "@babel/plugin-proposal-class-properties",
        "dynamic-import-node"
      ],
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "current"
            }
          }
        ],
        "@babel/preset-react",
        "@babel/preset-flow"
      ]
    };
  }

  return {
    plugins: ["@babel/plugin-proposal-class-properties"],
    presets: [
      [
        "@babel/preset-env",
        {
          loose: true,
          modules: false,
          useBuiltIns: "entry",
          corejs: "3.6"
        }
      ],
      "@babel/preset-react",
      "react-native",
      "@babel/preset-flow"
    ]
  };
};
