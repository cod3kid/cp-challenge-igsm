import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { useSelector } from "react-redux";

import firebase from "../../config/firebase";
import { getThemeColors } from "../../helpers";
import Screen from "../../components/Common/Screen";
import HomeHeader from "../../components/Home/Header";
import StoriesContainer from "../../components/Home/StoriesContainer";
import Post from "../../components/Common/Post";

const db = firebase.firestore();
export default function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.userReducer);
  const isDark = useSelector((state) => state.themeReducer);
  const [followingPosts, setFollowingPosts] = useState([]);
  const { main, primary, borderColor, borderWhite } = getThemeColors(isDark);
  const [otherProfiles, setOtherProfiles] = useState([]);
  const [currentUserData, setCurrentUserData] = useState([]);

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: main,
    },
    welcomeContainer: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 170,
      paddingHorizontal: 20,
    },
    welcomeHeader: {
      fontSize: 24,
      fontWeight: "bold",
      color: primary,
    },
    welcomeSubheader: {
      textAlign: "center",
      color: borderWhite,
    },
  });

  const getDataFromFireStore = async () => {
    let data = [];
    await db
      .collection("users")
      .doc(user.uid)
      .onSnapshot(async (doc) => {
        data = doc.data().following;
        setCurrentUserData(doc.data());
        await db
          .collection("users")
          .where("uid", "in", data)
          .onSnapshot(async (querySnapshot) => {
            const usersProfileData = [];
            querySnapshot.forEach((doc) => {
              usersProfileData.push(doc.data());
            });
            setOtherProfiles([...usersProfileData]);
          });

        await db
          .collection("posts")
          .where("uid", "in", data)
          // .orderBy("timestamp", "desc")
          .onSnapshot(async (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
              data.push({ id: doc.id, ...doc.data() });
            });
            setFollowingPosts([...data]);
          });
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
      <HomeHeader
        isDark={isDark}
        primary={primary}
        onPressAddIcon={() => navigation.navigate("AddPost", { user })}
        onPressChatIcon={() => null}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <StoriesContainer
          primary={primary}
          borderColor={borderColor}
          navigation={navigation}
          currentUserData={currentUserData}
        />
        {followingPosts.length ? (
          <FlatList
            data={followingPosts}
            keyExtractor={(item) => item.downloadUrl.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item, index }) => {
              return (
                <Post
                  post={item}
                  key={index}
                  otherProfiles={otherProfiles}
                  colors={getThemeColors(isDark)}
                />
              );
            }}
          />
        ) : (
          <WelcomeContent styles={styles} />
        )}
      </ScrollView>
    </Screen>
  );
}

const WelcomeContent = ({ styles }) => {
  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeHeader}>Welcome to Instagram</Text>
      <Text style={styles.welcomeSubheader}>
        Follow people to start seeing the photos and videos they share
      </Text>
    </View>
  );
};
