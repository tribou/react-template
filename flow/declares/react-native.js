// @flow

declare module 'react-native' {

  declare var AppRegistry: {
    registerComponent: (N: string, F: Function) => void,
  }

  declare var StyleSheet: {
    create: (T: Object) => Object,
  }

  declare class Text extends React$Component<*> {}

  declare class View extends React$Component<*> {}

}
