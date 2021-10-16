import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";

import t from "../../utils/translations";

export default function Footer({
  onPress,
  text,
  navText,
  primaryColor,
  navColor,
}) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      padding: 15,
      justifyContent: "center",
      alignItems: "center",
      borderTopWidth: 0.5,
      borderTopColor: primaryColor,
    },
    text: {
      color: primaryColor,
      fontSize: 13,
    },
    navText: {
      color: navColor,
      fontWeight: "bold",
      fontSize: 13,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text} </Text>
      <TouchableWithoutFeedback onPress={onPress}>
        <Text style={styles.navText}>{navText}.</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
