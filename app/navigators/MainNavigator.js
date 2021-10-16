import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import firebase from "../config/firebase";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

const auth = firebase.auth();
const db = firebase.firestore();

export default function MainNavigator() {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const getUserData = async (uid) => {
    const docRef = await db
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch({ type: "SET_USER_DATA", payload: doc.data() });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    return docRef;
  };
  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        getUserData(authUser.uid);
      } else {
        dispatch({ type: "REMOVE_USER_DATA" });
      }
    });
    return () => {
      listener();
    };
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
