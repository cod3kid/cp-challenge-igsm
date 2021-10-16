import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CustomInput({
  name,
  placeholder,
  value,
  onChangeText,
  containerColor,
  primaryColor,
  borderColor,
  isPassword = false,
  showIcon = false,
}) {
  const [showPassword, setShowPassword] = useState(isPassword);

  const styles = StyleSheet.create({
    customInput: {
      backgroundColor: containerColor,
      flexDirection: "row",
      padding: 8,
      marginVertical: 5,
      borderColor,
      borderWidth: 1,
      borderRadius: 4,
    },
    textInput: {
      marginLeft: 10,
      flex: 1,
      borderWidth: 0,
      fontSize: 14,
      color: primaryColor,
    },
  });

  return (
    <View style={styles.customInput}>
      <TextInput
        name={name}
        value={value}
        onChangeText={onChangeText}
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#ADB3BC"
        secureTextEntry={showPassword}
      />
      {showIcon && (
        <TouchableWithoutFeedback
          onPress={() => setShowPassword((prev) => !prev)}
        >
          <View style={{ alignSelf: "flex-end" }}>
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color={showPassword ? "grey" : "#1C7CFC"}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}
