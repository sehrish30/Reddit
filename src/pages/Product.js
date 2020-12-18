import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
} from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { useParams, useHistory } from "react-router-dom";
import productService from "../services/product";
import ProductComment from "../components/Product/ProductComment";
import CommentModal from "../components/Product/CommentModal";

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
  const [showModal, setShowModal] = useState(false);

  const productInfo = productsRef.doc(productId);

  const getProduct = useCallback(() => {
    productInfo
      .get()
      .then((doc) => {
        setProduct({ ...doc.data(), id: doc.id });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [productInfo]);

  const handleAddVote = () => {
    if (!user) {
      history.push("/login");
    } else {
      productService
        .addUpvote(user, productId)
        .then((newProduct) => setProduct(newProduct))
        .catch(() => history.push("/login"));
    }
  };

  const handleOpenModal = () => {
    if (!user) {
      history.push("/login");
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddComment = (commentText) => {
    if (!user) {
      history.push("/login");
    } else {
      productInfo.get().then((doc) => {
        if (doc.exists) {
          const previousComments = doc.data().comments;
          const newComment = {
            postedBy: { id: user.uid, name: user.displayName },
            created: Date.now(),
            text: commentText,
          };
          const updatedComments = [...previousComments, newComment];
          productInfo.update({ comments: updatedComments });
          setProduct((prevState) => ({
            ...prevState,
            comments: updatedComments,
          }));
        }
      });
      setShowModal(false);
    }
  };

  useEffect(() => {
    getProduct();
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
        <CommentModal
          isOpen={showModal}
          title="New Comment"
          sendAction={handleAddComment}
          closeAction={handleCloseModal}
        />
        {product && (
          <>
            <IonGrid>
              <IonRow>
                <IonCol className="ion-text-center">
                  <ProductItem product={product} browser={openBrowser} />
                  <ProductPhotos photos={product.photos} />
                  <IonButton
                    color="secondary"
                    onClick={() => handleAddVote()}
                    size="small"
                  >
                    Upvote
                  </IonButton>
                  <IonButton
                    color="secondary"
                    fill="clear"
                    onClick={() => handleOpenModal()}
                    size="small"
                  >
                    Comment
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
            {product.comments.map((comment, index) => (
              <ProductComment
                key={index}
                comment={comment}
                product={product}
                setProduct={setProduct}
              />
            ))}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Product;
