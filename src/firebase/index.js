import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./config";

export const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();

// register user
export const register = async (name, email, password) => {
  const newUser = await auth.createUserWithEmailAndPassword(email, password);
  return newUser.user.updateProfile({
    displayName: name,
  });
};

//login user
export const logIn = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

//logout user
export const logOut = () => {
  return auth.signOut();
};

//reset Password
export const resetPassword = (email) => {
  return auth.sendPasswordResetEmail(email);
};
