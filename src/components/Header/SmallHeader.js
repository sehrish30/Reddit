import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const SmallHeader = ({ title }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default SmallHeader;
