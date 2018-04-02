// @flow
/* eslint-disable import/prefer-default-export */
import Debug from "debug";
import Fs from "fs";
import Path from "path";

const log = Debug("my-app:server:utils");

function _getAssets(): BuildAssets {
  log("Reading assets.json and chunk-manifest.json from filesystem");
  const assetsFile = Path.resolve(__dirname, "../build/assets.json");
  const chunkManifest = Path.resolve(__dirname, "../build/chunk-manifest.json");
  try {
    const assets = JSON.parse(Fs.readFileSync(assetsFile, "utf-8"));
    const webpackMani = JSON.parse(Fs.readFileSync(chunkManifest, "utf-8"));
    return {
      ...assets,
      webpackMani
    };
  } catch (error) {
    log("Error:", error);
    const emptyAssets = {
      vendor: {
        js: ""
      },
      manifest: {
        js: ""
      },
      bundle: {
        js: "",
        css: ""
      },
      webpackMani: {}
    };
    return emptyAssets;
  }
}

// Cached for production
const Assets = _getAssets();

/**
 * Returns the parsed contents of assets.json
 *
 * @public
 * @returns {object} In development, reads and parses assets.json on every call.
 * In production, reads and parses assets.json on start-up and returns from
 * memory.
 */
export function getAssets(): BuildAssets {
  if (process.env.NODE_ENV === "production") {
    return Assets;
  }

  return _getAssets();
}

export function getCss(file: string = "styles.css"): ?string {
  const cssPath = `./public/${file}`;
  const cssFile = Path.resolve(__dirname, cssPath);
  let css = "";

  try {
    css = Fs.readFileSync(cssFile, "utf-8");
  } catch (error) {
    console.error(error);
  }

  return css;
}
