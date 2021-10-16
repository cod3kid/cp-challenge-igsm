import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import firebase from "../../config/firebase";
import { getThemeColors } from "../../helpers";
import Screen from "../../components/Common/Screen";

const db = firebase.firestore();
const screenWidth = Dimensions.get("window").width;

export default function SearchScreen({ navigation }) {
  const isDark = useSelector((state) => state.themeReducer);
  const [search, setSearch] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const { main, primary, dividerColor, blue, containerColor } =
    getThemeColors(isDark);
  const exploreImages = new Array(30).fill(
    { imageUrl: "https://picsum.photos/200" },
    0,
    30
  );

  const searchUsers = async () => {
    let user = {};
    if (search.length === 0) return;

    try {
      await db
        .collection("users")
        .where("username", "==", search)
        .limit(1)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (!doc.empty) {
              user = { ...doc.data() };
            }
          });

          return setSearchedUser(user);
        })
        .catch((err) => {
          Alert.alert("Error Occured");
        });
    } catch (ex) {
      Alert.alert("Error Occured");
    }
  };

  const getGridStyle = (index) => {
    if (exploreImages.length <= 2 && index % 2 === 0) {
      return styles.oddColumn;
    }

    if (exploreImages.length > 2 && index % 3 === 0) {
      return styles.oddColumn;
    }

    return styles.evenColumn;
  };

  useEffect(() => {
    if (searchedUser) {
      console.log("chnaged", searchedUser);
      navigation.navigate("OtherUserProfile", { user: searchedUser });
    }
  }, [searchedUser]);

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: main,
    },
    imageContainer: {
      width: screenWidth / 3 - 2,
      height: 110,
      backgroundColor: main,
    },
    separator: {
      marginTop: 2,
    },
    oddColumn: {
      marginRight: 0,
    },
    evenColumn: {
      marginLeft: 1,
      marginRight: 1,
    },
    image: {
      flex: 1,
      height: 150,
      width: "100%",
    },
    searchContainer: {
      margin: 10,
      marginBottom: 5,
    },
    searchInputContainer: {
      backgroundColor: containerColor,
      padding: 5,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    searchButtonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      padding: 10,
      marginHorizontal: 10,
      marginVertical: 5,
      marginBottom: 10,
      borderRadius: 6,
      backgroundColor: blue,
    },
    buttonFont: {
      color: "white",
    },
  });

  return (
    <Screen style={styles.screen}>
      <SearchInputContainer
        styles={styles}
        primary={primary}
        dividerColor={dividerColor}
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <SearchButton styles={styles} onPress={() => searchUsers()} />
      <ExploreGrid
        exploreImages={exploreImages}
        styles={styles}
        gridStyle={getGridStyle}
      />
    </Screen>
  );
}

const SearchInputContainer = ({
  styles,
  primary,
  dividerColor,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color={primary} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Username"
          placeholderTextColor={dividerColor}
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 16,
            color: primary,
          }}
        />
      </View>
    </View>
  );
};
const SearchButton = ({ styles, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.searchButtonContainer}>
        <Text style={styles.buttonFont}>Search</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const ExploreGrid = ({ styles, exploreImages, gridStyle }) => {
  return (
    <FlatList
      data={exploreImages}
      keyExtractor={(item, index) => index}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      numColumns={3}
      renderItem={({ item, index }) => {
        const { imageUrl } = item;
        return (
          <TouchableOpacity>
            <View style={[gridStyle(index), styles.imageContainer]}>
              <Image
                source={{ uri: `${imageUrl}?t=${Date.now()}` }}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};
