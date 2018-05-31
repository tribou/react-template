// @flow
// eslint-disable-next-line import/no-extraneous-dependencies
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";
import localForage from "localforage";
import { isBrowser } from "config/env";
import blacklist from "./blacklist";

export default {
  ...offlineConfig,
  persist: isBrowser() ? offlineConfig.persist : false,
  persistOptions: {
    ...offlineConfig.persistOptions,
    blacklist,
    storage: localForage
  }
};
