// @flow

'use strict'

// Global CSS variables passed via precss > postcss-custom-properties
// Also used throughout JS files in the site
// https://github.com/postcss/postcss-custom-properties#variables

const variables = {

  appTitle: 'Ooober',
  appDescription: 'The best site ever.',
  appIcon: '/static/images/logo.png',
  appLogo: '/static/images/logo.png',
  appLogoWidth: '64',
  appLogoHeight: '64',

  colorDark: '#4a4a4a', // darkgrey
  colorDarkFaded: 'rgba(74, 74, 74, 0.5)',
  colorTheme: 'rebeccapurple', // purple
  colorThemeFaded: '#e3d6e5', // fadetheme
  colorThemePale: '#f8f3fc', // paletheme
  colorThemeSecondary: '#246dca', // richblue
  colorThemeTertiary: '#1aa590', // jadegreen
  colorBlue: '#64daff', // cartoonblue
  colorGreen: '#84c500', // green
  colorGray: '#9f9f9f', // midgrey
  colorGrayLight: '#ececec', // lightgrey
  colorWhite: '#ffffff',
  colorWhiteFaded: 'rgba(255, 255, 255, 0.5)',


  fontFamily: 'MyApp, Verdana, sans-serif',
  fontWeight: 400,

  navLogoTopPadding: '6rem',
  navLogoTopPaddingSm: '4rem',

  screenLgMax: '1199px',
  screenLgMaxHeight: '800px',
  screenLgMin: '1200px',
  screenMdMax: '1023px',
  screenMdMin: '1024px',
  screenSmMax: '767px',
  screenSmMin: '768px',
  screenXsMax: '320px',
  screenXsMin: '321px',

  zModal: 50,
  zModalBackdrop: 40,

}


module.exports = variables
