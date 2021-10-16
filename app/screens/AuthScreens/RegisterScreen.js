import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import t from "../../utils/translations";
import { lightColors, darkColors } from "../../utils/colors";
import firebase from "../../config/firebase";
import Screen from "../../components/Common/Screen";
import CustomInput from "../../components/Auth/CustomInput";
import CustomButton from "../../components/Auth/CustomButton";
import LanguageModal from "../../components/Auth/LanguageModal";
import LanguageSelector from "../../components/Auth/LanguageSelector";
import InstagramText from "../../components/Common/InstagramText";
import Footer from "../../components/Auth/Footer";
import AuthLoader from "../../components/Auth/AuthLoader";
import Alert from "../../components/Common/Alert";
import { getThemeColors } from "../../helpers";

const auth = firebase.auth();
const db = firebase.firestore();

export default function LoginScreen({ navigation }) {
  const isDark = useSelector((state) => state.themeReducer);
  const {
    main,
    primary,
    blue,
    containerColor,
    darkBlueText,
    dividerColor,
    borderColor,
  } = getThemeColors(isDark);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoaderVisible, setLoaderVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const styles = StyleSheet.create({
    screen: {
      justifyContent: "space-between",
      backgroundColor: main,
    },
    mainContainer: {
      justifyContent: "flex-start",
      alignItems: "center",
    },
    formContainer: {
      width: "100%",
      padding: 30,
    },
    forgotPassContainer: {
      padding: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    textContainer: {
      textAlign: "center",
    },
    forgotLoginText: {
      color: dividerColor,
    },
    getLoginHelpText: {
      color: darkBlueText,
      fontWeight: "bold",
    },
  });

  const initialValues = {
    name: "",
    email: "",
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    username: Yup.string().required(),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Required"),
  });

  const onSubmit = async (values) => {
    Keyboard.dismiss();

    const { name, email, password, username } = values;
    setLoaderVisible(true);
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        return db
          .collection("users")
          .doc(res.user.uid)
          .set({
            uid: res.user.uid,
            name,
            username,
            email,
            account_type: "public",
            followers: [],
            following: [],
            posts: 0,
            bio: "",
          })
          .then((res) => {
            setLoaderVisible(false);
            setAlertMessage("Account Created");
            setShowAlert(true);
            navigation.navigate("Login");
          });
      })
      .catch((err) => {
        console.log("err", err);
        setLoaderVisible(false);
        setShowAlert(true);
        return;
      });
  };

  return (
    <Screen style={styles.screen}>
      <LanguageSelector
        onPress={() => setModalVisible(true)}
        color={dividerColor}
      />
      <View style={styles.mainContainer}>
        <InstagramText color={primary} />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnMount
        >
          {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
            <View style={styles.formContainer}>
              <CustomInput
                name="name"
                placeholder={t("fullName")}
                value={values.name}
                onChangeText={handleChange("name")}
                containerColor={containerColor}
                borderColor={borderColor}
                primaryColor={primary}
              />
              <CustomInput
                name="email"
                placeholder={t("email")}
                value={values.email}
                onChangeText={handleChange("email")}
                containerColor={containerColor}
                borderColor={borderColor}
                primaryColor={primary}
              />
              <CustomInput
                name="username"
                placeholder={t("username")}
                value={values.username}
                onChangeText={handleChange("username")}
                containerColor={containerColor}
                borderColor={borderColor}
                primaryColor={primary}
              />
              <CustomInput
                name="password"
                placeholder={t("password")}
                value={values.password}
                onChangeText={handleChange("password")}
                containerColor={containerColor}
                borderColor={borderColor}
                primaryColor={primary}
                isPassword
                showIcon
              />
              <CustomButton
                isLoaderVisible={isLoaderVisible}
                isValid={isValid}
                color={blue}
                inValidColor={
                  isDark ? darkColors.mediumBlue : lightColors.lightBlue
                }
                onPress={handleSubmit}
                title={t("signUpButton")}
              />
            </View>
          )}
        </Formik>
      </View>
      <Footer
        primaryColor={dividerColor}
        navColor={isDark ? darkColors.aceBlue : lightColors.darkBlue}
        text={t("preLogInText")}
        navText={t("footerLogIn")}
        onPress={() => navigation.navigate("Login")}
      />
      <LanguageModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
      <Alert
        isModalVisible={showAlert}
        setModalVisible={setShowAlert}
        message={alertMessage}
      />
    </Screen>
  );
}
