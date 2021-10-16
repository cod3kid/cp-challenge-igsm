import React, { useEffect } from "react";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { getThemeColors, getLightIcon, getDarkIcon } from "../helpers";
import HomeNavigator from "./HomeNavigator";
import ReelsScreen from "../screens/AppScreens/ReelsScreen";
import ActivityScreen from "../screens/AppScreens/ActivityScreen";
import SearchNavigator from "./SearchNavigator";
import ProfileNavigator from "./ProfileNavigator";
import { bottomNavIcons } from "../utils";

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  const isDark = useSelector((state) => state.themeReducer);

  const { main, primary } = getThemeColors(isDark);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
        showLabel: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: main,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={
                isDark
                  ? getDarkIcon(focused, "home")
                  : getLightIcon(focused, "home")
              }
              style={{ height: 24, width: 24 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SearchNav"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={
                isDark
                  ? getDarkIcon(focused, "search")
                  : getLightIcon(focused, "search")
              }
              style={{ height: 24, width: 24 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Reels"
        component={ReelsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={
                isDark
                  ? getDarkIcon(focused, "reels")
                  : getLightIcon(focused, "reels")
              }
              style={{ height: 24, width: 24 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={
                isDark
                  ? getDarkIcon(focused, "heart")
                  : getLightIcon(focused, "heart")
              }
              style={{ height: 24, width: 24 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="account"
              color={primary}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
