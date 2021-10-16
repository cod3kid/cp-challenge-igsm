import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { get } from "lodash";

import Screen from "../../components/Common/Screen";
import firebase from "../../config/firebase";
import { getThemeColors } from "../../helpers";
import ProfilePostList from "../../components/Common/ProfilePostList";
import ProfileTabsContainer from "../../components/Common/ProfileTabsContainer";
import ProfileBio from "../../components/Profile/ProfileBio";
import ProfileBoxContainer from "../../components/Common/ProfileBoxContainer";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileImage from "../../components/Common/ProfileImage";

const db = firebase.firestore();

export default function ProfileScreen({ navigation }) {
  const isDark = useSelector((state) => state.themeReducer);
  const user = useSelector((state) => state.userReducer);
  const [profileData, setProfileData] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const { main, borderColor, primary, borderWhite } = getThemeColors(isDark);
  const { uid } = user;
  const { username, name, bio, followers, following, posts, profile_pic } =
    userData;

  const getDataFromFireStore = async () => {
    await db
      .collection("posts")
      .where("uid", "==", uid)
      .orderBy("timestamp", "desc")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setProfileData([...data]);
      });

    await db
      .collection("users")
      .doc(uid)
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

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: main,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    subHeader: {
      flexDirection: "row",
    },
    oddColumn: {
      marginRight: 0,
    },
    evenColumn: {
      marginLeft: 1,
      marginRight: 1,
    },
    profileData: {
      flexDirection: "row",
    },
  });

  return (
    <Screen style={styles.screen}>
      <ProfileHeader username={username} colors={getThemeColors(isDark)} />
      <View style={styles.profileData}>
        <ProfileImage imageUrl={profile_pic} />
        <ProfileBoxContainer
          following={get(following, "length", "")}
          followers={get(followers, "length", "")}
          posts={posts}
          colors={getThemeColors(isDark)}
        />
      </View>
      <ProfileBio
        navigation={navigation}
        colors={getThemeColors(isDark)}
        userData={userData}
        name={name}
        bio={bio}
        isProfile
      />
      <ProfileTabsContainer primary={primary} borderWhite={borderWhite} />
      <ScrollView>
        {profileData.length ? (
          <ProfilePostList profileData={profileData} />
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </Screen>
  );
}
