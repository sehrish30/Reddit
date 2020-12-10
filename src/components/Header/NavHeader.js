import React from "react";
import { IonHeader } from "@ionic/react";
import { IonBackButton, IonButtons, IonTitle, IonToolbar } from "@ionic/react";

// this header has a backbutton
const NavHeader = ({ title }) => {
  return (
    <IonHeader>
      <IonToolbar color="tertiary">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};
export default NavHeader;
