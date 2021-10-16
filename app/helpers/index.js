import { darkColors, lightColors } from "../utils/colors";
import { bottomNavIcons } from "../utils";
const {
  homeLightActive,
  homeLightInactive,
  searchLightActive,
  searchLightInactive,
  reelsLightActive,
  reelsLightInactive,
  heartLightActive,
  heartLightInactive,

  homeDarkActive,
  homeDarkInactive,
  searchDarkActive,
  searchDarkInactive,
  reelsDarkActive,
  reelsDarkInactive,
  heartDarkActive,
  heartDarkInactive,
} = bottomNavIcons;

export const getImageBlob = async () => {
  await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
};

export const getThemeColors = (isDark) => {
  const colors = {
    main: isDark ? darkColors.main : lightColors.main,
    primary: isDark ? darkColors.primary : lightColors.primary,
    blue: isDark ? darkColors.lightBlue : lightColors.mediumBlue,
    containerColor: isDark ? darkColors.darkGrey : lightColors.offWhite,
    borderColor: isDark ? darkColors.darkGrey : lightColors.lightGrey,
    darkBlueText: isDark ? darkColors.aceBlue : lightColors.darkBlue,
    dividerColor: isDark ? darkColors.secondary : lightColors.darkGrey,
    borderWhite: isDark ? darkColors.primary : lightColors.lightGrey,
  };

  return colors;
};

export const getLightIcon = (focused, icon) => {
  let selectedIcon;
  if (focused) {
    switch (icon) {
      case "home":
        selectedIcon = homeLightActive;
        break;

      case "search":
        selectedIcon = searchLightActive;
        break;

      case "reels":
        selectedIcon = reelsLightActive;
        break;

      case "heart":
        selectedIcon = heartLightActive;
        break;

      default:
        selectedIcon = homeLightActive;
    }

    return selectedIcon;
  }

  switch (icon) {
    case "home":
      selectedIcon = homeLightInactive;
      break;

    case "search":
      selectedIcon = searchLightInactive;
      break;

    case "reels":
      selectedIcon = reelsLightInactive;
      break;

    case "heart":
      selectedIcon = heartLightInactive;
      break;

    default:
      selectedIcon = homeLightInactive;
  }

  return selectedIcon;
};

export const getDarkIcon = (focused, icon) => {
  let selectedIcon;
  if (focused) {
    switch (icon) {
      case "home":
        selectedIcon = homeDarkActive;
        break;

      case "search":
        selectedIcon = searchDarkActive;
        break;

      case "reels":
        selectedIcon = reelsDarkActive;
        break;

      case "heart":
        selectedIcon = heartDarkActive;
        break;

      default:
        selectedIcon = homeDarkActive;
    }

    return selectedIcon;
  }

  switch (icon) {
    case "home":
      selectedIcon = homeDarkInactive;
      break;

    case "search":
      selectedIcon = searchDarkInactive;
      break;

    case "reels":
      selectedIcon = reelsDarkInactive;
      break;

    case "heart":
      selectedIcon = heartDarkInactive;
      break;

    default:
      selectedIcon = homeDarkInactive;
  }

  return selectedIcon;
};
