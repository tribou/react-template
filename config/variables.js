// @flow

'use strict'

// Global CSS variables passed via precss > postcss-custom-properties
// Also used throughout JS files in the site
// https://github.com/postcss/postcss-custom-properties#variables

const variables = {

  colorDark: '#353535',
  colorDarkFaded: 'rgba(53, 53, 53, 0.5)',
  colorTheme: '#33c5ff',
  colorThemeFaded: 'RGBA(81, 180, 242, 0.5)',
  colorThemeSecondary: '#d89e41',
  colorThemeTertiary: '#4fc949',
  colorGrayDark: '#c4c4c4',
  colorGrayLight: '#e6eae6',
  colorPurple: 'rebeccapurple',
  colorWhite: '#ffffff',
  colorWhiteFaded: 'rgba(255, 255, 255, 0.5)',

  fontFamily: 'MyApp, Verdana, Sans-Serif',
  fontWeight: 400,

  imgLogoSmWidth: '64px',
  imgLogoSmHeight: '64px',

  navMenuHeight: '70px',

  screenLgMax: '1199px',
  screenLgMaxHeight: '800px',
  screenLgMin: '1200px',
  screenMdMax: '1023px',
  screenMdMin: '1024px',
  screenSmMax: '767px',
  screenSmMin: '768px',
  screenXsMax: '320px',
  screenXsMin: '321px',

  zHeader: 10,
  zModal: 50,
  zModalBackdrop: 40,

}


module.exports = variables
