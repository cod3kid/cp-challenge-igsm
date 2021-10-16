import React, { useState } from "react";
import i18n from "i18n-js";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";

import configureStore from "./app/redux/store";
import { getAppLanguage } from "./app/utils/storage";
import MainNavigator from "./app/navigators/MainNavigator";

const store = configureStore();

export default function App() {
  const [isReady, setIsReady] = useState();

  const getOrSetCurrentLanguage = async () => {
    const lang = await getAppLanguage();
    if (!lang) {
      return (i18n.locale = "en");
    }
    return (i18n.locale = lang);
  };

  const preloadingRituals = () => {
    getOrSetCurrentLanguage();
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={preloadingRituals}
        onError={() => {
          console.log("Error Occured");
        }}
        onFinish={() => setIsReady(true)}
      />
    );

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
