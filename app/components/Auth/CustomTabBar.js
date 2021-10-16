import React from "react";
import { Text } from "react-native";
import { TabBar } from "react-native-tab-view";

export default function CustomTabBar(props) {
  return (
    <TabBar
      {...props}
      pressColor="white"
      indicatorStyle={{ backgroundColor: "black" }}
      style={{ backgroundColor: "none", color: "black" }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color: "black", margin: 8 }}>{route.title}</Text>
      )}
    />
  );
}
