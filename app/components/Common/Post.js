import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { find, get } from "lodash";
import firebaseMain from "firebase";
import { useNavigation } from "@react-navigation/core";

import firebase from "../../config/firebase";
import { otherIcons } from "../../utils/index";

const db = firebase.firestore();
export default function Post({ post, colors, otherProfiles }) {
  const navigation = useNavigation();
  const user = useSelector((state) => state.userReducer);
  const { primary } = colors;
  console.log(post);
  const styles = StyleSheet.create({
    postContainer: {
      marginBottom: 6,
    },
    postHeaderContainer: {
      paddingVertical: 9,
      paddingHorizontal: 10,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
    postHeaderProfile: {
      flexDirection: "row",
      alignItems: "center",
    },
    postHeaderDisplayPic: {
      height: 33,
      width: 33,
      borderRadius: 20,
    },
    actionContainerStyle: {
      padding: 10,
      paddingBottom: 5,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    captionContainerStyle: {
      marginHorizontal: 10,
      flexDirection: "row",
    },
    postHeaderUsername: {
      marginLeft: 10,
      fontSize: 14,
      fontWeight: "bold",
      color: primary,
    },
    media: {
      height: 350,
      width: "100%",
    },
    captionUsername: {
      fontWeight: "bold",
      paddingRight: 5,
      color: primary,
    },
    actionMain: {
      flexDirection: "row",
    },
    bold: {
      fontWeight: "bold",
      paddingHorizontal: 10,
      color: primary,
    },
    actionIconStyle: {
      marginRight: 10,
    },
    captionText: {
      color: primary,
    },
  });

  const handleLike = async () => {
    const docRef = await db.collection("posts").doc(post.uid);
    docRef.update({
      posts: firebaseMain.firestore.FieldValue.arrayUnion({
        username: user.username,
        uid: user.uid,
      }),
    });
  };

  return (
    <View style={styles.postContainer}>
      <PostHeader
        post={post}
        url={get(find(otherProfiles, { uid: post.uid }), "profile_pic")}
        styles={styles}
        primary={primary}
      />
      <MediaContainer imageUrl={post.downloadUrl} styles={styles} />
      <ActionIconsContainer
        styles={styles}
        primary={primary}
        onPressLike={() => handleLike()}
        onPressComment={() => {
          navigation.navigate("Comments", { post: post });
        }}
      />
      {get(post, "likes.length") > 0 ? (
        <LikesContainer post={post} styles={styles} />
      ) : null}
      <CaptionContainer post={post} styles={styles} />
    </View>
  );
}

const PostHeader = ({ post, styles, primary, url }) => {
  const { username } = post;
  return (
    <View style={styles.postHeaderContainer}>
      <View style={styles.postHeaderProfile}>
        <Image source={{ uri: url }} style={styles.postHeaderDisplayPic} />
        <Text style={styles.postHeaderUsername}>{username}</Text>
      </View>
      <MaterialCommunityIcons name="dots-vertical" size={20} color={primary} />
    </View>
  );
};
const MediaContainer = ({ imageUrl, styles }) => {
  return (
    <View>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.media}
      />
    </View>
  );
};
const LikesContainer = ({ styles, post }) => {
  return (
    <View style={styles.actionMain}>
      <Text style={styles.bold}>{get(post, "likes.length")} likes</Text>
    </View>
  );
};

const CaptionContainer = ({ post, styles }) => {
  const { username, caption } = post;
  return (
    <View style={styles.captionContainerStyle}>
      <Text>
        <Text style={styles.captionUsername}>{username} </Text>{" "}
        <Text style={styles.captionText}>{caption}</Text>
      </Text>
    </View>
  );
};
const ActionIcon = ({ children, styles, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.actionIconStyle}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

const ActionIconsContainer = ({
  styles,
  primary,
  onPressLike,
  onPressComment,
}) => {
  return (
    <View style={styles.actionContainerStyle}>
      <View style={styles.actionMain}>
        <ActionIcon styles={styles} onPress={onPressLike}>
          <Ionicons name="ios-heart-outline" size={28} color={primary} />
        </ActionIcon>
        <ActionIcon styles={styles} onPress={onPressComment}>
          <Ionicons name="chatbubble-outline" size={26} color={primary} />
        </ActionIcon>
        <ActionIcon styles={styles}>
          <Ionicons name="ios-paper-plane-outline" size={26} color={primary} />
        </ActionIcon>
      </View>
      <ActionIcon styles={styles}>
        <Ionicons name="ios-bookmark-outline" size={26} color={primary} />
      </ActionIcon>
    </View>
  );
};
