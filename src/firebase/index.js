import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebaseConfig from "./config";

export const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();
export const storage = app.storage();

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

// check email and password to reauthenticate user
export const checking = (email, password) => {
  return firebase.auth.EmailAuthProvider.credential(email, password);
};

//Products Ref Collection
export const productsRef = db.collection("products");
