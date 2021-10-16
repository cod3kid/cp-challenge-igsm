import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { lightColors } from "../../utils/colors";
import { getCurrentLanguage } from "../../utils/translations";

export default function LanguageSelector({ onPress, color }) {
  const styles = StyleSheet.create({
    container: {
      marginTop: 15,
      flexDirection: "row",
      justifyContent: "center",
    },
    languageText: {
      color,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.languageText}>{getCurrentLanguage()}</Text>
        <MaterialCommunityIcons name="chevron-down" size={20} color={color} />
      </View>
    </TouchableWithoutFeedback>
  );
}
