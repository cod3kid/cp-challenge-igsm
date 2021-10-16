import React from "react";
import { View, Text, StyleSheet } from "react-native";

import t from "../../utils/translations";

export default function OrContainer({ paddingHorizontal, color }) {
  return (
    <View style={[styles.container, { paddingHorizontal }]}>
      <View style={[styles.divider, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]}> {t("or").toUpperCase()} </Text>
      <View style={[styles.divider, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  text: {
    paddingHorizontal: 5,
    fontWeight: "bold",
  },
  divider: {
    height: 0.5,
    flex: 1,
  },
});
