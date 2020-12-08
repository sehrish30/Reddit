import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import SmallHeader from "../components/Header/SmallHeader";
import LargeHeader from "../components/Header/LargeHeader";

const Home = () => {
  return (
    <IonPage>
      <SmallHeader title="Hunt" />
      <IonContent fullscreen>
        <LargeHeader title="Hunt" />
      </IonContent>
      {/* <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle style={{ color: "white" }}>Hunt</IonTitle>
        </IonToolbar>
      </IonHeader> */}
    </IonPage>
  );
};

export default Home;
