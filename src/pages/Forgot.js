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
import ValidatePasswordReset from "../components/Auth/validatePasswordReset";
import { resetPassword } from "../firebase";
import { useHistory } from "react-router-dom";

const INITIAL_STATE = {
  email: "",
};

const Forgot = () => {
  const history = useHistory();
  const [busy, setBusy] = useState(false);

  const handleResetPassword = async () => {
    setBusy(true);
    const { email } = values;
    try {
      await resetPassword(email);
      toast("Check your email to reset password");
      history.push("/login");
    } catch (err) {
      console.error("Password Reset|Error", err);
      toast(err.message, 400, "danger");
    }
    setBusy(false);
  };

  const {
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
  } = useFormValidation(
    INITIAL_STATE,
    ValidatePasswordReset,
    handleResetPassword
  );
  return (
    <IonPage>
      <NavHeader title="Reset Password" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            value={values.email}
            name="email"
            type="email"
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
              Get Reset Link
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Forgot;
