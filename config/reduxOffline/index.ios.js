// @flow
// eslint-disable-next-line import/no-extraneous-dependencies
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";

// TODO: Consider switching to redux-persist-filesystem-storage to avoid
// Android storage limit with AsyncStorage.
// https://github.com/robwalkerco/redux-persist-filesystem-storage
// https://github.com/rt2zz/redux-persist/issues/199
import { AsyncStorage } from "react-native";

import blacklist from "./blacklist";

export default {
  ...offlineConfig,
  persistOptions: {
    ...offlineConfig.persistOptions,
    blacklist,
    storage: AsyncStorage
  }
};
