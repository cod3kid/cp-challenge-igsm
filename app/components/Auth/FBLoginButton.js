import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import t from "../../utils/translations";

export default function FBLoginButton({ backgroundColor, color, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.commonFlex}>
      <View style={[styles.commonFlex, styles.container, { backgroundColor }]}>
        <MaterialCommunityIcons name="facebook" size={30} color={color} />
        <Text style={[styles.text, { color }]}>{t("loginWithFacebook")}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  commonFlex: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: 6,
    borderRadius: 4,
  },
  text: {
    fontWeight: "bold",
    marginLeft: 5,
  },
});
