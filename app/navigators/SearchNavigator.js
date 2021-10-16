import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../screens/AppScreens/SearchScreen";
import OtherUserProfileScreen from "../screens/AppScreens/OtherUserProfileScreen";

const Stack = createStackNavigator();

const SearchNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        name="OtherUserProfile"
        component={OtherUserProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
