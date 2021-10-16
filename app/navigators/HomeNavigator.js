import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/AppScreens/HomeScreen";
import AddPostScreen from "../screens/AppScreens/AddPostScreen";
import CommentsScreen from "../screens/AppScreens/CommentsScreen";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddPost" component={AddPostScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
