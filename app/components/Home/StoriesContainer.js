import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { stories } from "../../utils";

export default function StoriesContainer({
  navigation,
  primary,
  borderColor,
  currentUserData,
}) {
  const styles = StyleSheet.create({
    storyContainer: {
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
      paddingVertical: 6,
    },
    storyBackground: {
      width: 75,
      height: 75,
      marginLeft: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    story: {
      width: 68,
      height: 68,
      borderRadius: 35,
      borderWidth: 3,
    },
    text: {
      color: primary,
      fontSize: 13,
    },
    realProfilePic: {
      height: 75,
      width: 75,
      borderRadius: 50,
      marginLeft: 5,
    },
  });

  return (
    <View>
      <ScrollView horizontal showHorizontalScrollIndicator={false}>
        <View style={styles.storyContainer}>
          <TouchableWithoutFeedback>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {currentUserData.profile_pic ? (
                <Image
                  source={{ uri: currentUserData.profile_pic }}
                  style={styles.realProfilePic}
                />
              ) : (
                <Image
                  source={require("../../assets/images/avatar.png")}
                  style={{ height: 75, width: 75 }}
                />
              )}
              <Text style={{ fontSize: 13, color: primary }}>Your Story</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <FlatList
          horizontal
          data={stories}
          keyExtractor={(item) => item.user.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={styles.storyContainer}>
                <TouchableOpacity
                  onPress={() => navigation.push("StoryScreen")}
                >
                  <ImageBackground
                    style={styles.storyBackground}
                    source={require("../../assets/images/story-border.png")}
                  >
                    <Image
                      source={{ uri: `${item.image}?t=${Date.now()}` }}
                      style={styles.story}
                    />
                  </ImageBackground>
                </TouchableOpacity>
                <Text style={styles.text}>
                  {console.log(item.user)}
                  {item.user.length > 11
                    ? item.user.slice(0, 10).toLowerCase() + "..."
                    : item.user.toLowerCase()}
                </Text>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}
