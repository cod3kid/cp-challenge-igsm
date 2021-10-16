import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import firebaseMain from "firebase";

import firebase from "../../config/firebase";
import Screen from "../../components/Common/Screen";
import { getThemeColors } from "../../helpers";
import { TextInput } from "react-native-gesture-handler";

const db = firebase.firestore();
export default function CommentsScreen({ navigation, route }) {
  const isDark = useSelector((state) => state.themeReducer);
  const user = useSelector((state) => state.userReducer);
  const { post } = route.params;
  const [comment, setComment] = useState("");
  const { main, primary, borderColor, blue } = getThemeColors(isDark);

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: main,
    },
    commentContainer: {
      flexDirection: "row",
      padding: 20,
      alignItems: "center",
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      marginBottom: 15,
    },
    subHeaderContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    headerText: {
      fontSize: 20,
      marginLeft: 20,
      fontWeight: "bold",
      color: primary,
    },
    commentInputContainer: {
      flexDirection: "row",
      padding: 10,
      flex: 1,
      position: "absolute",
      bottom: 0,
      alignItems: "center",
      borderTopColor: borderColor,
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
  });

  const addComment = async () => {
    const docRef = await db.collection("posts").doc(post.id);
    docRef.update({
      comments: firebaseMain.firestore.FieldValue.arrayUnion({
        username: user.username,
        uid: user.uid,
        comment: comment,
      }),
    });
  };
  return (
    <Screen style={styles.screen}>
      <CommentsHeader styles={styles} goBack={() => navigation.goBack()} />

      <CommentInput
        styles={styles}
        primary={blue}
        value={comment}
        onChangeText={(text) => setComment(text)}
        onPress={() => addComment()}
      />

      <FlatList
        data={post.comments}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.commentContainer}>
              <Image
                source={{ uri: `https://picsum.photos/200?t=${Date.now()}` }}
                style={styles.image}
              />
              <Text>{item.comment}</Text>
            </View>
          );
        }}
      />
    </Screen>
  );
}
const CommentInput = ({ styles, onPress, primary, value, onChangeText }) => {
  return (
    <View style={styles.commentInputContainer}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={{ flex: 1, marginLeft: 10 }}
        placeholder="Comment"
      />
      <TouchableOpacity onPress={onPress}>
        <Text style={{ color: primary }}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};
const CommentsHeader = ({ styles, primary, goBack }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.subHeaderContainer}>
        <TouchableWithoutFeedback onPress={goBack}>
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={34}
            color={primary}
          />
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>Comments</Text>
      </View>
      <View>
        <TouchableWithoutFeedback>
          <Ionicons name="ios-paper-plane-outline" size={30} color={primary} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
