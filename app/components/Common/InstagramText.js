import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function InstagramText({
  color,
  fontSize = 55,
  marginLeft = 20,
}) {
  const [fontsLoaded] = useFonts({
    Billabong: require("../../assets/fonts/billabong.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const styles = StyleSheet.create({
    instagramText: {
      marginLeft,
      fontSize,
      fontFamily: "Billabong",
      color,
    },
  });

  return <Text style={styles.instagramText}>Instagram</Text>;
}
