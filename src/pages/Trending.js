import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import SmallHeader from "../components/Header/SmallHeader";
import LargeHeader from "../components/Header/LargeHeader";
import ProductList from "../components/Product/ProductList";
import { useLocation } from "react-router-dom";

const Trending = () => {
  const location = useLocation();

  return (
    <IonPage>
      <SmallHeader title="Trending" />
      <IonContent fullscreen>
        <LargeHeader title="Trending" />
        <br></br>
        <ProductList location={location} />
      </IonContent>
    </IonPage>
  );
};

export default Trending;
