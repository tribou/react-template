/* eslint-disable */

type BuildAssets = {
  vendor: {
    js: string,
  },
  bundle: {
    js: string,
    css: string,
  },
}

// webpack hmr
declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
}
