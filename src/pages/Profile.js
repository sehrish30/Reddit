import React, { useContext } from "react";
import {
  IonPage,
  IonContent,
  IonCardContent,
  IonCard,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonCol,
  IonRow,
  IonButton,
  IonGrid,
} from "@ionic/react";
import { mailOutline, personCircleOutline } from "ionicons/icons";
import UserContext from "../contexts/UserContext";
import SmallHeader from "../components/Header/SmallHeader";
import LargeHeader from "../components/Header/LargeHeader";
import { toast } from "../utils/toast";
import { logOut } from "../firebase";

const Profile = () => {
  const { user } = useContext(UserContext);

  const logoutUser = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error("Logout error", err);
      toast(err.message);
    }
  };

  return (
    <IonPage>
      <SmallHeader title="Profile" />
      <IonContent fullscreen>
        <LargeHeader title="Profile" />
        {user ? (
          <>
            <IonCard color="medium">
              <IonCardContent>
                <IonList lines="inset">
                  <IonItem color="medium">
                    <IonIcon icon={personCircleOutline} slot="start"></IonIcon>
                    <IonLabel>
                      <strong>{user.displayName}</strong>
                      <p>Username</p>
                    </IonLabel>
                  </IonItem>
                  <IonItem color="medium">
                    <IonIcon icon={mailOutline} slot="start"></IonIcon>
                    <IonLabel>
                      <strong>{user.email}</strong>
                      <p>Email</p>
                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  routerLink={"/edit-profile"}
                  color="secondary"
                >
                  Edit Profile
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  fill="outline"
                  expand="block"
                  color="secondary"
                  onClick={logoutUser}
                >
                  Logout
                </IonButton>
              </IonCol>
            </IonRow>
          </>
        ) : (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  routerLink={"/register"}
                  color="primary"
                >
                  Sign Up
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  expand="block"
                  routerLink={"/login"}
                  color="primary"
                  fill="outline"
                >
                  Log In
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
