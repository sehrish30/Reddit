import React from "react";
import { withRouter } from "react-router-dom";
import {
  IonCard,
  IonCardContent,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
} from "@ionic/react";
import "./product.css";

const ProductItem = ({ product, url, browser }) => {
  return (
    <IonCard routerLink={url} onClick={browser} button>
      <IonCardContent class="ion-no-padding">
        <IonList lines="none">
          <IonItem>
            <IonThumbnail slot="start">
              <IonImg src={product.thumbnail} />
            </IonThumbnail>

            <IonLabel>
              <div className="ion-text-wrap">
                <strong className="product-title">{product.title}</strong>
              </div>

              <div className="ion-text-wrap product-description">
                {product.description}
              </div>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default withRouter(ProductItem);
