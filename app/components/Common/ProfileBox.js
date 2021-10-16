import React from "react";
import { View, Text } from "react-native";

export default function ProfileBox({ label, value, styles }) {
  return (
    <View style={styles.dataContainer}>
      <Text style={styles.dataValue}>{value}</Text>
      <Text style={styles.dataLabel}>{label}</Text>
    </View>
  );
}
