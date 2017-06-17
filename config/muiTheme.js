// @flow
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import vars from 'config/variables'

// http://www.material-ui.com/#/customization/themes
const getMuiThemeConfig = (userAgent: ?string): Object => getMuiTheme({
  fontFamily: vars.fontFamily,
  palette: {
    primary1Color: vars.colorTheme,
    primary2Color: vars.colorThemeSecondary,
    primary3Color: vars.colorThemeTertiary,
    accent1Color: vars.colorBlue,
    accent2Color: vars.colorGrayLight,
    accent3Color: vars.colorGray,
    textColor: vars.colorDark,
    secondaryTextColor: vars.colorTheme,
    alternateTextColor: vars.colorWhite,
    canvasColor: vars.colorWhite,
    borderColor: vars.colorGray,
    disabledColor: vars.colorGray,
    pickerHeaderColor: vars.colorTheme,
    clockCircleColor: vars.colorGray,
    shadowColor: vars.colorDark,
  },
  spacing: {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56,
  },
  datePicker: {
    selectColor: vars.colorTheme,
  },
  snackbar: {
    textColor: vars.colorWhite,
    backgroundColor: vars.colorDark,
    actionColor: vars.colorBlue,
  },
}, {
  userAgent,
})


export default getMuiThemeConfig
