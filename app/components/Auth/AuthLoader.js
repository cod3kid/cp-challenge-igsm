import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

export default function AuthLoader({
  isModalVisible,
  setModalVisible,
  title,
  loaderColor,
}) {
  return (
    <Overlay
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
      overlayStyle={styles.overlayStyle}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
        }}
      >
        <ActivityIndicator size="large" color={loaderColor} />
        <Text style={{ color: loaderColor, marginLeft: 5 }}>{title}</Text>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlayStyle: {
    height: 50,
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
