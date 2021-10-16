import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import i18n from "i18n-js";
import { Overlay } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import t from "../../utils/translations";
import { languages } from "../../utils/index";
import { storeAppLanguage } from "../../utils/storage";
import { TextInput } from "react-native";

export default function LanguageModal({ isModalVisible, setModalVisible }) {
  const changeCurrentAppLanguage = (id) => {
    i18n.locale = id;
    storeAppLanguage(id);
    setModalVisible(false);
  };

  return (
    <Overlay
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
      overlayStyle={styles.overlayStyle}
    >
      <Text style={styles.title}>{t("selectYourLanguage").toUpperCase()}</Text>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color="grey" />
        <TextInput style={styles.searchPlaceholder} placeholder={t("search")} />
      </View>
      <FlatList
        data={languages}
        keyExtractor={(item) => item.language.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          const { language, native, id } = item;
          return (
            <TouchableOpacity onPress={() => changeCurrentAppLanguage(id)}>
              <View style={styles.listItem}>
                <Text style={styles.listText}>{t(language)}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    width: "90%",
    margin: 20,
    padding: 0,
  },
  title: {
    fontSize: 16,
    padding: 15,
  },
  searchContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "grey",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  searchPlaceholder: {
    flex: 1,
    paddingLeft: 5,
    fontSize: 16,
  },
  listItem: {
    padding: 15,
  },
  listText: {
    fontSize: 16,
  },
});
