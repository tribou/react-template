// @flow

"use strict";

// Global CSS variables passed via precss > postcss-custom-properties
// Also used throughout JS files in the site
// https://github.com/postcss/postcss-custom-properties#variables

const variables = {
  // App-specific config
  appTitle: "Ooober",
  appDescription: "The best site ever.",
  appIcon: "/static/images/logo.png",
  appLogo: "/static/images/logo@2x.png",
  appLogoWidth: "192",
  appLogoHeight: "192",

  appAuthCookieKey: "my-app-v1",
  appAuthExpirySeconds: 1209600, // 14 days in seconds

  baseRemSize: "16", // CAUTION: Think twice before changing!
  borderRadius: "3px",

  colorDark: "#4a4a4a", // darkgrey
  colorDarkFaded: "rgba(74, 74, 74, 0.5)",
  colorTheme: "#663399", // purple
  colorThemeFaded: "#e3d6e5", // fadetheme
  colorThemePale: "#f8f3fc", // paletheme
  colorThemeSecondary: "#246dca", // richblue
  colorThemeTertiary: "#1aa590", // jadegreen
  colorBlue: "#64daff", // cartoonblue
  colorGreen: "#84c500", // green
  colorGray: "#9f9f9f", // midgrey
  colorGrayLight: "#ececec", // lightgrey
  colorWhite: "#ffffff",
  colorWhiteFaded: "rgba(255, 255, 255, 0.5)",

  fontFamily:
    'MyApp, "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
  fontWeight: 300,

  navLogoTopPadding: "6rem",
  navLogoTopPaddingSm: "4rem",

  screenLgMax: "1199px",
  screenLgMaxHeight: "800px",
  screenLgMin: "1200px",
  screenMdMax: "1023px",
  screenMdMin: "1024px",
  screenSmMax: "767px",
  screenSmMin: "768px",
  screenXsMax: "320px",
  screenXsMin: "321px",

  zModal: 50,
  zModalBackdrop: 40,

  // Framework-specific config
  fobReduxStateVar: "__THIS_DA_LOAD__",
  fobWebpackManiVar: "__MANI_FOR_WEBPACK__",

  // Standard sizes based on REMs
  s1: ".25rem",
  s2: ".5rem",
  s3: "1rem",
  s4: "2rem",
  s5: "4rem",
  s6: "8rem",
  s7: "16rem"
};

module.exports = variables;
