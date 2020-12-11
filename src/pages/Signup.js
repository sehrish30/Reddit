import React, { useState } from "react";
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
import ValidateSignup from "../components/Auth/validateSignup";
import { register } from "../firebase";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const INITIAL_STATE = {
    name: "",
    email: "",
    password: "",
  };

  const [busy, setBusy] = useState(false);

  const authenticateUser = async () => {
    setBusy(true);
    const { name, email, password } = values;
    try {
      await register(name, email, password);
      toast("You have signed up successfully");
      history.push("/");
    } catch (err) {
      console.error("Authentication Error", err);
      toast(err.message, 400, "danger");
    }
    setBusy(false);
  };

  const {
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
  } = useFormValidation(INITIAL_STATE, ValidateSignup, authenticateUser);

  return (
    <IonPage color="primary">
      <NavHeader title="Sign up" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Username</IonLabel>
          <IonInput
            name="name"
            value={values.name}
            type="text"
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            value={values.email}
            onIonChange={handleChange}
            name="email"
            type="email"
            required
          ></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            value={values.password}
            onIonChange={handleChange}
            name="password"
            type="password"
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
              Signup
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
