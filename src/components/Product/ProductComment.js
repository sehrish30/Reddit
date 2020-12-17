import React, { useContext, useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import UserContent from "../../contexts/UserContext";
import CommentModal from "./CommentModal";
import { productsRef } from "../../firebase";
import "./product.css";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";

const ProductComment = ({ comment, product, setProduct }) => {
  const { user } = useContext(UserContent);
  const [showModal, setShowModal] = useState(false);

  const postedByAuthUser = user && user.uid === comment.postedBy.id;

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const hanldeEditComment = (commentText) => {
    const productInfo = productsRef.doc(product.id);
    productInfo.get().then((doc) => {
      if (doc.exists) {
        const previousComment = doc.data().comments;
        const newComment = {
          postedBy: { id: user.uid, name: user.displayName },
          created: Date.now(),
          text: commentText,
        };
        // double checking the existence of comment
        const updatedComment = previousComment.map((item) =>
          item.created ? newComment : item
        );

        productInfo.update({ comments: updatedComment });
        setProduct((prevState) => ({
          ...prevState,
          comments: updatedComment,
        }));
      }
    });
    setShowModal(false);
  };

  const handleDeleteComment = () => {
    const productInfo = productsRef.doc(product.id);
    productInfo.get().then((doc) => {
      if (doc.exists) {
        const previousComments = doc.data().comments;
        const updatedComments = previousComments.filter(
          (item) => item.created !== comment.created
        );
        productInfo.update({ comments: updatedComments });
        setProduct((prevState) => ({
          ...prevState,
          comments: updatedComments,
        }));
      }
    });
  };

  return (
    <>
      <CommentModal
        isOpen={showModal}
        title="Edit Comment"
        sendAction={hanldeEditComment}
        closeAction={handleCloseModal}
        comment={comment}
      />
      <IonCard>
        <IonCardContent>
          <IonList lines="none">
            <IonItem>
              <IonLabel class="ion-text-wrap">
                <p className="comment-text">
                  {comment.postedBy.name}
                  {" | "}
                  {formatDistanceToNow(comment.created)}
                </p>
                <div className="ion-padding-vertical">{comment.text}</div>
                {postedByAuthUser && (
                  <IonButton size="small" onClick={() => setShowModal(true)}>
                    Edit
                  </IonButton>
                )}
                {postedByAuthUser && (
                  <IonButton
                    size="small"
                    onClick={() => handleDeleteComment(comment)}
                  >
                    Delete
                  </IonButton>
                )}
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default ProductComment;
