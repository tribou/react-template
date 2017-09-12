// @flow

declare module 'react-native' {

  declare export var AppRegistry: {
    registerComponent: (N: string, F: Function) => void,
  }

  declare export var StyleSheet: {
    create: (T: Object) => Object,
  }

  declare export class Text extends React$Component<*> {}

  declare export class View extends React$Component<*> {}

}
