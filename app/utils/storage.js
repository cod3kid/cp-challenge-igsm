import * as SecureStore from "expo-secure-store";

const key = "userData";
const languageKey = "currentLanguage";

export const storeAppLanguage = async (language) => {
  try {
    await SecureStore.setItemAsync(languageKey, language);
  } catch (error) {
    console.log("Error storing the current language", error);
  }
};

export const getAppLanguage = async () => {
  try {
    return await SecureStore.getItemAsync(languageKey);
  } catch (error) {
    console.log("Error getting the current language", error);
  }
};

export const storeUserData = async (userData) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(userData));
  } catch (error) {
    console.log("Error storing the user data", error);
  }
};

export const getUserData = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the user data", error);
  }
};

export const removeUserData = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the user data", error);
  }
};
