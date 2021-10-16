import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { get } from "lodash";

import firebase from "../../config/firebase";
import Screen from "../../components/Common/Screen";
import ProfilePostList from "../../components/Common/ProfilePostList";
import ProfileTabsContainer from "../../components/Common/ProfileTabsContainer";
import ProfileBoxContainer from "../../components/Common/ProfileBoxContainer";
import ProfileImage from "../../components/Common/ProfileImage";
import { getThemeColors } from "../../helpers";
import ProfileBio from "../../components/Profile/ProfileBio";

const db = firebase.firestore();

export default function OtherUserProfileScreen({ route, navigation }) {
  const isDark = useSelector((state) => state.themeReducer);
  const currentUser = useSelector((state) => state.userReducer);
  const { main, primary } = getThemeColors(isDark);
  const [profileData, setProfileData] = useState([]);
  const [userData, setUserData] = useState({});
  const { user } = route.params;
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: main,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
    },
    subHeader: {
      flexDirection: "row",
      alignItems: "center",
    },
    username: {
      fontWeight: "bold",
      fontSize: 20,
      marginLeft: 30,
      color: primary,
    },
    dataContainer: {
      flexDirection: "row",
      marginBottom: 10,
    },
  });

  const getDataFromFireStore = async () => {
    await db
      .collection("posts")
      .where("uid", "==", user.uid)
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setProfileData(data);
      });

    await db
      .collection("users")
      .doc(user.uid)
      .onSnapshot((doc) => {
        setUserData(doc.data());
      });
  };

  useEffect(() => {
    getDataFromFireStore();
    return () => {
      getDataFromFireStore();
    };
  }, []);
  return (
    <Screen style={styles.screen}>
      <HeaderContainer
        primary={primary}
        styles={styles}
        username={user.username}
        onPressBack={() => navigation.goBack()}
      />
      <View style={styles.dataContainer}>
        <ProfileImage imageUrl={user.profile_pic} />
        <ProfileBoxContainer
          colors={getThemeColors(isDark)}
          posts={get(userData, "posts", 0)}
          followers={get(userData, "followers.length", "")}
          following={get(userData, "following.length", "")}
        />
      </View>
      <ProfileBio
        colors={getThemeColors(isDark)}
        currentUserId={currentUser.uid}
        userData={userData}
        name={user.name}
        bio={user.bio}
        isOther
      />
      <ProfileTabsContainer primary={primary} />
      <ProfilePostList profileData={profileData} />
    </Screen>
  );
}

const HeaderContainer = ({ username, styles, onPressBack, primary }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.subHeader}>
        <TouchableWithoutFeedback onPress={onPressBack}>
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={32}
            color={primary}
          />
        </TouchableWithoutFeedback>

        <Text style={styles.username}>{username}</Text>
      </View>

      <MaterialCommunityIcons name="dots-vertical" size={26} color={primary} />
    </View>
  );
};
