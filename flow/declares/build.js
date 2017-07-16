// @flow

declare type BuildAssets = {
  vendor: {
    js: string,
  },
  manifest: {
    js: string,
  },
  bundle: {
    js: string,
    css: string,
  },
  webpackMani: Object,
}

// webpack hmr
declare var module: {
  hot: {
    accept(path: string | Array<string>, callback: () => void): void,
    status: () => string,
  }
}
