// flow-typed signature: 18b44b7ba7b63109870af532398df064
// flow-typed version: 2b02af3ee0/react-router-native_v4.x.x/flow_>=v0.53.x

declare module 'react-router-native' {
  declare export type GetUserConfirmation =
    (message: string, callback: (confirmed: boolean) => void) => void;

  declare type LocationShape = {
    pathname?: string,
    search?: string,
    hash?: string,
    state?: any,
  };

  declare export class NativeRouter extends React$Component<{
    getUserConfirmation?: GetUserConfirmation,
    keyLength?: number,
    children?: React$Node,
  }> {}

  declare export class Link extends React$Component<{
    to: string | LocationShape,
    replace?: boolean,
    children?: React$Node,
  }> {}

  declare export class DeepLinking extends React$Component<{ children?: React$Node }> {}

  declare export class AndroidBackButton extends React$Component<{ children?: React$Node }> {}
}
