import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import Instagram from "../../assets/images/instagram-text.svg";
import InstagramLight from "../../assets/images/instagram-text-light.svg";

export default function HomeHeader({
  userData,
  primary,
  isDark,
  onPressAddIcon,
  onPressMessengerIcon,
}) {
  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 15,
      paddingVertical: 15,
    },
  });
  return (
    <View style={styles.header}>
      <View style={{ alignItems: "flex-start" }}>
        {isDark ? (
          <InstagramLight width={160} height={45} />
        ) : (
          <Instagram width={140} height={35} />
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableWithoutFeedback onPress={onPressAddIcon}>
          <FontAwesome name="plus-square-o" size={28} color={primary} />
        </TouchableWithoutFeedback>

        <MaterialCommunityIcons
          style={{ marginLeft: 10 }}
          name="facebook-messenger"
          size={28}
          color={primary}
        />
      </View>
    </View>
  );
}
