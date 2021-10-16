import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function CustomButton({
  title,
  onPress,
  color,
  isValid,
  inValidColor,
  isLoaderVisible,
}) {
  const styles = StyleSheet.create({
    parent: {
      backgroundColor: isValid ? color : inValidColor,
      width: "100%",
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5,
      padding: 12,
      borderRadius: 4,
    },
    textStyle: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "bold",
    },
  });

  return (
    <TouchableOpacity onPress={(e) => (isValid ? onPress(e) : null)}>
      <View style={styles.parent}>
        {isLoaderVisible ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.textStyle}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
