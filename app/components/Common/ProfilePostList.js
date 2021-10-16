import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function ProfilePostList({ profileData }) {
  const styles = StyleSheet.create({
    imageContainer: {
      width: screenWidth / 3 - 2,
      height: 110,
      backgroundColor: "black",
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
  });

  const getGridStyle = (index) => {
    if (profileData.length <= 2 && index % 2 === 0) {
      return styles.oddColumn;
    }

    if (profileData.length > 2 && index % 3 === 0) {
      return styles.oddColumn;
    }

    return styles.evenColumn;
  };

  return (
    <FlatList
      data={profileData}
      keyExtractor={(item) => item.downloadUrl}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      numColumns={3}
      renderItem={({ item, index }) => {
        const { downloadUrl } = item;
        return (
          <TouchableOpacity>
            <View style={[getGridStyle(index), styles.imageContainer]}>
              <Image source={{ uri: downloadUrl }} style={styles.image} />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
