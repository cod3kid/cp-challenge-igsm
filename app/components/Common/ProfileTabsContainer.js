import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProfileTabsContainer({ primary }) {
  const styles = StyleSheet.create({
    tabsContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginBottom: 5,
    },
    gridIcon: {
      flexDirection: "row",
      justifyContent: "center",
      borderBottomWidth: 2,
      borderBottomColor: primary,
      flex: 1,
      paddingVertical: 10,
    },
    accountIcon: {
      flexDirection: "row",
      justifyContent: "center",
      flex: 1,
      paddingVertical: 10,
    },
  });
  return (
    <View style={styles.tabsContainer}>
      <View style={styles.gridIcon}>
        <MaterialCommunityIcons name="grid" size={24} color={primary} />
      </View>
      <View style={styles.accountIcon}>
        <MaterialCommunityIcons
          name="account-box-outline"
          size={30}
          color={primary}
        />
      </View>
    </View>
  );
}
