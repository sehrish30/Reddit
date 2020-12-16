import React, { useCallback, useContext, useEffect, useState } from "react";
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { useParams, useHistory } from "react-router-dom";

import { productsRef } from "../firebase";
import { Plugins } from "@capacitor/core";
import UserContext from "../contexts/UserContext";
import NavHeader from "../components/Header/NavHeader";
import ProductItem from "../components/Product/ProductItem";
import ProductPhotos from "../components/Product/ProductPhotos";

const { Browser } = Plugins;

const Product = () => {
  let { productId } = useParams();
  let history = useHistory();
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState(null);

  const productInfo = productsRef.doc(productId);

  const getProduct = () => {
    productInfo
      .get()
      .then((doc) => {
        setProduct({ ...doc.data(), id: doc.id });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getProduct();
    console.log("PRODUCT", product, productId);
  }, [productId]);

  const handleDeleteProduct = async () => {
    try {
      await productInfo.delete();
      console.log(`Document with ID ${product.id} deleted`);
    } catch (err) {
      console.error(err);
    }
    history.push("/");
  };

  const postedByAuthUser = () => {
    return user && user.uid === product?.poastedBy.id;
  };

  const openBrowser = async () => {
    await Browser.open({
      url: product.url,
    });
  };

  return (
    <IonPage>
      <NavHeader
        title={product && product.description}
        option={product && postedByAuthUser(product)}
        icon={closeCircleOutline}
        action={handleDeleteProduct}
      />
      <IonContent>
        {product && (
          <>
            <IonGrid>
              <IonRow>
                <IonCol className="ion-text-center">
                  <ProductItem product={product} browser={openBrowser} />
                  <ProductPhotos photos={product.photos} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Product;
