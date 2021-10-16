import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Switch } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import firebase from "../../config/firebase";
import { getThemeColors } from "../../helpers";
import { settingsList } from "../../utils";
import Screen from "../../components/Common/Screen";

const auth = firebase.auth();

const signout = () => {
  auth.signOut();
};

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.themeReducer);
  const { main, primary } = getThemeColors(isDark);
  const [themeColor, setThemeColor] = useState(isDark);

  useEffect(() => {
    dispatch({ type: "SET_THEME", isDark: themeColor });
  }, [themeColor]);

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: main,
    },
    listItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingLeft: 20,
      paddingVertical: 5,
    },
    text: {
      fontSize: 16,
      marginLeft: 20,
      color: primary,
    },
    separator: {
      marginVertical: 10,
      marginLeft: 60,
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      marginBottom: 15,
    },
    headerText: {
      fontSize: 20,
      marginLeft: 20,
      color: primary,
    },
  });

  return (
    <Screen style={styles.screen}>
      <SettingsHeader
        styles={styles}
        primary={primary}
        goBack={() => navigation.goBack()}
      />
      <SettingsListContainer
        styles={styles}
        theme={themeColor}
        theme={themeColor}
        setTheme={(value) => setThemeColor(value)}
        primary={primary}
      />
    </Screen>
  );
}
const SettingsHeader = ({ styles, primary, goBack }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableWithoutFeedback onPress={goBack}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={34}
          color={primary}
        />
      </TouchableWithoutFeedback>
      <Text style={styles.headerText}>Settings</Text>
    </View>
  );
};

const SettingsListContainer = ({ styles, theme, setTheme, primary }) => {
  return (
    <FlatList
      data={settingsList}
      keyExtractor={(item) => item.name.toString()}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => {
        return (
          <SettingsListItem
            styles={styles}
            name={item.name}
            icon={item.icon}
            onPress={item.icon === "logout-variant" ? signout : item.onPress}
            theme={theme}
            setTheme={setTheme}
            isDark={item.isDark}
            primary={primary}
          />
        );
      }}
    />
  );
};

const SettingsListItem = ({
  onPress,
  icon,
  name,
  styles,
  theme,
  setTheme,
  isDark,
  primary,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.listItem}>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons name={icon} size={28} color={primary} />
          <Text style={styles.text}>{name}</Text>
        </View>

        {isDark && (
          <View>
            <Switch value={theme} onValueChange={setTheme} />
          </View>
        )}
      </View>
      <View></View>
    </TouchableOpacity>
  );
};
