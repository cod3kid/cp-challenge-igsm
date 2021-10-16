import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

export default function Alert({ isModalVisible, setModalVisible, message }) {
  return (
    <Overlay
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
      overlayStyle={styles.overlayStyle}
    >
      <View
        style={{
          alignItems: "center",
          padding: 5,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{message}</Text>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlayStyle: {
    height: 50,
    margin: 20,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
