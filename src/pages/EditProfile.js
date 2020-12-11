import React, { useContext, useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
} from "@ionic/react";
import NavHeader from "../components/Header/NavHeader";
import { toast } from "../utils/toast";
import useFormValidation from "../hooks/useFormValidation";
import validateEditProfile from "../components/Auth/validateEditProfile";
import { logIn, checking } from "../firebase";
import { useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const EditProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [busy, setBusy] = useState(false);
  const history = useHistory();

  const INITIAL_STATE = {
    name: user && user.displayName,
    email: user && user.email,
    newPassword: "",
    currentPassword: "",
  };

  const reAuthenticateUser = async (email, password) => {
    const credential = checking(email, password);
    try {
      await user.reauthenticateWithCredential(credential);
      console.log("Reauthentication Successfull");
    } catch (err) {
      console.error("Profile update error", err);
      toast(err.message);
    }
  };

  const updateProfileItem = async (name, email, password) => {
    await user.updateProfile({
      displayName: name,
    });

    await user.updateEmail(email);
    if (password) {
      await user.updatePassword(password);
    }
  };

  const authenticateUser = async () => {
    setBusy(true);
    const { name, email, currentPassword, newPassword } = values;
    try {
      const reAuthenticate = reAuthenticateUser(user.email, currentPassword);
      const updateProfile = updateProfileItem(name, email, newPassword);
      await Promise.all([reAuthenticate, updateProfile]);
      const result = await logIn(email, newPassword || currentPassword);
      setUser(result.user);
      toast("You have updated your profile successfully");
      setValues({
        name: user && user.displayName,
        email: user && user.email,
        newPassword: "",
        currentPassword: "",
      });
      history.push("/profile");
    } catch (err) {
      console.error("Profile update error", err);
      toast(err.message);
    }
    setBusy(false);
  };

  const {
    handleSubmit,
    handleChange,
    setValues,
    values,
    isSubmitting,
  } = useFormValidation(INITIAL_STATE, validateEditProfile, authenticateUser);

  return (
    <IonPage>
      <NavHeader title="Edit Profile" />
      <IonLoading message="Please wait..." isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Username</IonLabel>
          <IonInput
            name="name"
            type="text"
            value={values.name}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            name="email"
            type="email"
            value={values.email}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">New Password</IonLabel>
          <IonInput
            name="newPassword"
            type="password"
            value={values.newPassword}
            onIonChange={handleChange}
          ></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Current Password</IonLabel>
          <IonInput
            name="currentPassword"
            type="password"
            value={values.currentPassword}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>

        <IonRow>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Save
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
