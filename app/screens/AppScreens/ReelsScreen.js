import React, { useState, useRef } from "react";
import { View, StyleSheet, FlatList, Text, Image } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Video } from "expo-av";

import { getThemeColors } from "../../helpers";
import { reels } from "../../utils";
import Screen from "../../components/Common/Screen";

export default function ReelsScreen() {
  const isDark = useSelector((state) => state.themeReducer);
  const { main, primary } = getThemeColors(isDark);

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: "white",
      opacity: 0.7,
    },
    video: {
      flex: 1,
      height: 700,
      width: "100%",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      position: "absolute",
      top: 0,
      width: "100%",
      zIndex: 1,
      marginTop: 10,
    },
    reelActionBar: {
      position: "absolute",
      bottom: 100,
      right: 0,
    },
    reelsHeaderText: {
      fontSize: 22,
      marginLeft: 15,
      fontWeight: "bold",
      color: "#FFFFFF",
    },
    cameraIcon: {
      marginRight: 15,
    },
    padding6: {
      padding: 6,
    },
    profileImageStyle: {
      height: 50,
      width: 50,
      borderRadius: 25,
    },
    userInfo: {
      flexDirection: "row",
      position: "absolute",
      alignItems: "center",
      bottom: 40,
      left: 0,
      marginLeft: 10,
    },
    userText: {
      marginLeft: 10,
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return (
    <Screen>
      <ReelsHeader styles={styles} primary={primary} />
      <FlatList
        data={reels}
        keyExtractor={(item) => item.url.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => {
          return (
            <View>
              <VideoPlayer url={item.url} styles={styles} />
              <ReelsActionBar main={main} styles={styles} />
              <UserInfoContainer
                url={item.profile_pic}
                username={item.username}
                styles={styles}
              />
            </View>
          );
        }}
      />
    </Screen>
  );
}
const VideoPlayer = ({ url, styles }) => {
  const videoRef = useRef(null);

  return (
    <Video
      ref={videoRef}
      style={styles.video}
      source={url}
      isMuted
      shouldPlay={true}
      useNativeControls
      resizeMode="stretch"
      isLooping
    />
  );
};
const ReelsHeader = ({ styles }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.reelsHeaderText}>Reels</Text>
      <View style={styles.cameraIcon}>
        <MaterialCommunityIcons name="camera" size={28} color="#FFFFFF" />
      </View>
    </View>
  );
};

const ReelsActionBar = ({ styles }) => {
  return (
    <View style={styles.reelActionBar}>
      <View style={styles.padding6}>
        <Ionicons name="ios-heart-outline" size={33} color="#FFFFFF" />
      </View>
      <View style={styles.padding6}>
        <Ionicons name="chatbubble-outline" size={30} color="#FFFFFF" />
      </View>
      <View style={styles.padding6}>
        <Ionicons name="ios-paper-plane-outline" size={30} color="#FFFFFF" />
      </View>
    </View>
  );
};

const UserInfoContainer = ({ url, username, styles }) => {
  return (
    <View style={styles.userInfo}>
      <Image source={{ uri: url }} style={styles.profileImageStyle} />
      <Text style={styles.userText}>{username}</Text>
    </View>
  );
};
