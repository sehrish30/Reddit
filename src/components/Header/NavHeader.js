import React from "react";
import { IonButton, IonHeader, IonIcon } from "@ionic/react";
import { IonBackButton, IonButtons, IonTitle, IonToolbar } from "@ionic/react";

// this header has a backbutton
const NavHeader = ({ title, option, icon, action }) => {
  return (
    <IonHeader>
      <IonToolbar color="tertiary">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        {option && (
          <IonButtons slot="primary">
            <IonButton onClick={action}>
              <IonIcon slot="icon-only" icon={icon} />
            </IonButton>
          </IonButtons>
        )}
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};
export default NavHeader;
