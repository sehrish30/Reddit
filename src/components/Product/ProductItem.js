import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonThumbnail,
} from "@ionic/react";
import "./product.css";
import UserContext from "../../contexts/UserContext";
import productService from "../../services/product";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useHistory } from "react-router-dom";
import {
  caretUp,
  chatbubbleEllipsesOutline,
  chevronUpCircleOutline,
  personCircleOutline,
  timeOutline,
} from "ionicons/icons";

const ProductItem = ({ product, url, browser }) => {
  const { user } = useContext(UserContext);
  const history = useHistory();

  const addUpvote = (e) => {
    e.preventDefault();
    e.stopPropagation();
    productService.addUpvote(user, product.id).catch(() => {
      history.push("/login");
    });
  };
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
              <p className="product-upvote">
                <IonIcon
                  icon={chevronUpCircleOutline}
                  className="product-upvote-icon"
                />{" "}
                <IonText className="upvote-count">{product.voteCount}</IonText>
                {" | "}
                <IonIcon
                  icon={personCircleOutline}
                  className="upvote-count"
                />{" "}
                <IonText className="upvote-count">
                  {product.poastedBy.name}
                </IonText>
                {" | "}
                <IonIcon icon={timeOutline} className="upvote-count" />{" "}
                <IonText className="upvote-count">
                  {formatDistanceToNow(product.created)}
                </IonText>
                {product.comments.length > 0 && (
                  <>
                    {" | "}
                    <IonIcon
                      className="upvote-count"
                      icon={chatbubbleEllipsesOutline}
                    />
                    {"  "}
                    <IonText className="upvote-count">
                      {product.comments.length}
                    </IonText>
                  </>
                )}{" "}
              </p>
            </IonLabel>
            <IonButton slot="end" onClick={addUpvote} size="Large">
              <div className="upvote-button_inner">
                <IonIcon icon={caretUp} />
                {product.voteCount}
              </div>
            </IonButton>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default withRouter(ProductItem);
