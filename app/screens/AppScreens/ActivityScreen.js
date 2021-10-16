import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Screen from "../../components/Common/Screen";
import { getThemeColors } from "../../helpers";
export default function ActivityScreen() {
  const isDark = useSelector((state) => state.themeReducer);
  const { main, primary } = getThemeColors(isDark);
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: main,
    },
    activityHeader: {
      fontSize: 22,
      fontWeight: "bold",
      paddingHorizontal: 20,
      paddingVertical: 10,
      color: primary,
    },
    noActivityContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    noActivityText: {
      fontSize: 18,
      color: primary,
    },
  });
  return (
    <Screen style={styles.screen}>
      <Text style={styles.activityHeader}>Activity</Text>

      <View style={styles.noActivityContainer}>
        <Text style={styles.noActivityText}>No Activity Found</Text>
      </View>
    </Screen>
  );
}
