import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import firebase from "../../config/firebase";
import { lightColors } from "../../utils/colors";
import { getThemeColors } from "../../helpers";
import Screen from "../../components/Common/Screen";

const db = firebase.firestore();
export default function EditProfileScreen({ navigation, route }) {
  const isDark = useSelector((state) => state.themeReducer);
  const { user } = route.params;
  const [nameOfUser, setName] = useState(user.name);
  const [userBio, setUserBio] = useState(user.bio);
  const { main, primary, blue, borderWhite, dividerColor } =
    getThemeColors(isDark);

  const [isUploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) alert("you need to give permission");
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadFile = async (uri) => {
    setUploading(true);

    if (image) {
      try {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });

        const uniqueId = uuidv4();
        const ref = firebase.storage().ref().child(uniqueId);
        const snapshot = await ref.put(blob);
        blob.close();

        const downloadUrl = await snapshot.ref.getDownloadURL();

        try {
          const docRef = await db.collection("users").doc(user.uid);
          const setWithMerge = docRef.set(
            {
              profile_pic: downloadUrl,
              name: nameOfUser,
              bio: userBio,
            },
            { merge: true }
          );
        } catch (ex) {
          console.log("Erro", ex);
        }
      } catch (ex) {
        console.log(ex);
      }
    } else {
      const docRef = await db.collection("users").doc(user.uid);
      const setWithMerge = docRef.set(
        {
          name: nameOfUser,
          bio: userBio,
        },
        { merge: true }
      );
    }

    setUploading(false);
    navigation.navigate("Profile");
  };

  useEffect(() => {
    requestPermission();
  }, []);

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
      marginBottom: 15,
    },
    headerText: {
      fontSize: 20,
      marginLeft: 20,
      fontWeight: "bold",
      color: primary,
    },
    image: {
      height: 100,
      width: 100,
      borderRadius: 50,
    },
    container: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 10,
    },
    textInputContainer: {
      padding: 10,
      borderBottomColor: dividerColor,
      borderBottomWidth: 1,
      marginHorizontal: 20,
    },
    textInput: {
      fontSize: 16,
      color: dividerColor,
    },
    changeProfilePhoto: {
      fontSize: 18,
      color: blue,
    },
    subHeaderContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
  });
  return (
    <Screen style={styles.screen}>
      <EditProfileHeader
        styles={styles}
        primary={primary}
        onPressCheck={() => uploadFile(image)}
        goBack={() => navigation.goBack()}
      />
      <ProfilePicture
        imageUrl={user.profile_pic}
        styles={styles}
        blue={blue}
        selectedImage={image}
        onPress={() => selectImage()}
      />

      <View style={{ marginTop: 20 }}>
        <TextInputField
          placeholder="Name"
          value={nameOfUser}
          onChangeText={(text) => setName(text)}
          placeholderTextColor={dividerColor}
          styles={styles}
        />
        <TextInputField
          placeholder="Bio"
          value={userBio}
          onChangeText={(text) => setUserBio(text)}
          placeholderTextColor={dividerColor}
          styles={styles}
        />
      </View>
    </Screen>
  );
}

const TextInputField = ({
  placeholder,
  value,
  onChangeText,
  placeholderTextColor,
  styles,
}) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const EditProfileHeader = ({ styles, primary, goBack, onPressCheck }) => {
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
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>
      <View>
        <TouchableWithoutFeedback onPress={onPressCheck}>
          <MaterialCommunityIcons name="check" size={34} color={primary} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const ProfilePicture = ({ selectedImage, imageUrl, styles, blue, onPress }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onPress}>
          {imageUrl ? (
            <Image
              source={{
                uri: selectedImage ? selectedImage : imageUrl,
              }}
              style={styles.image}
            />
          ) : (
            <MaterialCommunityIcons
              name="account-circle"
              size={100}
              color={lightColors.lightGrey}
            />
          )}
        </TouchableWithoutFeedback>
      </View>
      <Text style={styles.changeProfilePhoto}>Change Profile Photo</Text>
    </View>
  );
};
