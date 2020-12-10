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
  IonRouterLink,
  IonRow,
} from "@ionic/react";
import NavHeader from "../components/Header/NavHeader";
import { toast } from "../utils/toast";
import useFormValidation from "../hooks/useFormValidation";
import ValidateLogin from "../components/Auth/validateLogin";
import { logIn } from "../firebase";
import { useHistory } from "react-router-dom";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const Login = () => {
  const history = useHistory();
  const [busy, setBusy] = useState(false);

  const authenticateUser = async () => {
    setBusy(true);
    const { email, password } = values;
    try {
      await logIn(email, password);
      toast("You have Logged in successfully");
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
  } = useFormValidation(INITIAL_STATE, ValidateLogin, authenticateUser);
  return (
    <IonPage>
      <NavHeader title="Login" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            name="email"
            value={values.email}
            type="email"
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            name="password"
            value={values.password}
            type="password"
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
              Login
            </IonButton>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol class="ion-text-center ion-padding vertical">
            <IonRouterLink routerLink={`/forgot`}>
              Forgot password?
            </IonRouterLink>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;
