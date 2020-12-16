import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IonCard, IonImg, IonItem, IonList, IonThumbnail } from "@ionic/react";
import { PhotosAlbumType } from "@capacitor/core";
import "./product.css";

const ProductPhotos = ({ photos }) => {
  const [index, setIndex] = useState(0);

  return (
    <IonCard>
      <IonList lines="none">
        <IonItem>
          <div className="product-image">
            <IonImg src={photos[index]} />
          </div>
        </IonItem>
        <IonItem color="warning">
          {photos.map((p, i) => (
            <IonThumbnail
              key={`photo_${i}`}
              onClick={() => setIndex(i)}
              slot="start"
            >
              <IonImg className="photo-select" src={p} />
            </IonThumbnail>
          ))}
        </IonItem>
      </IonList>
    </IonCard>
  );
};
PropTypes.propTypes = {
  photos: PropTypes.array,
};

export default ProductPhotos;
