import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import SmallHeader from "../components/Header/SmallHeader";
import LargeHeader from "../components/Header/LargeHeader";
import ProductList from "../components/Product/ProductList";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  return (
    <IonPage>
      <SmallHeader title="Hunt" />
      <IonContent color="tertiary" fullscreen>
        <LargeHeader title="Hunt" />
        <br></br>
        <ProductList location={location} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
