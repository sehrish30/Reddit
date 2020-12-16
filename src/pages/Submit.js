import React, { useContext, useState } from "react";
import useFormValidation from "../hooks/useFormValidation";
import {
  IonPage,
  IonContent,
  IonLabel,
  IonItem,
  IonInput,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import SmallHeader from "../components/Header/SmallHeader";
import LargeHeader from "../components/Header/LargeHeader";
import { productsRef, storage } from "../firebase";
import { toast } from "../utils/toast";
import { useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import validateCreateProduct from "../components/Product/validateCreateProduct";
import Upload from "../components/Form/Upload";

const Submit = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);
  const [thumb, setThumb] = useState([]);
  const [photos, setPhotos] = useState([]);

  const handleCreate = async () => {
    try {
      if (!user) {
        history.push("/login");
        return;
      }
      setSubmitting(true);

      const { url, description, title } = values;
      const id = productsRef.doc().id;

      await Promise.all([
        ...thumb.map((f, index) =>
          storage.ref().child(`products/${id}_thumb_${index}.jpg`).put(f)
        ),

        ...photos.map((f, index) =>
          storage.ref().child(`products/${id}_photo_${index}.jpg`).put(f)
        ),
      ]);

      // returns a new Promise that resolves to an array of resolved Values
      const productPhotos = await Promise.all(
        photos.map((f, index) =>
          storage
            .ref()
            .child(`products/${id}_photo_${index}.jpg`)
            .getDownloadURL()
        )
      );

      const productThumbs = await Promise.all(
        thumb.map((f, index) =>
          storage
            .ref()
            .child(`products/${id}_thumb_${index}.jpg`)
            .getDownloadURL()
        )
      );

      const newProduct = {
        title,
        url,
        description,
        poastedBy: {
          id: user.uid,
          name: user.displayName,
        },
        thumbnail: productThumbs[0] || null,
        photos: productPhotos,
        voteCount: 1,
        comments: [],
        votes: [
          {
            votedBy: { id: user.uid, name: user.displayName },
          },
        ],
        created: Date.now(),
      };
      setThumb([]);
      setPhotos([]);
      await productsRef.doc(id).set(newProduct);
      setSubmitting(false);
      history.push("/");
    } catch (err) {
      console.error(err);
      toast(err.message);
      setSubmitting(false);
    }
  };

  const INITIAL_STATE = {
    title: "",
    description: "",
    url: "",
  };

  const { handleSubmit, handleChange, values } = useFormValidation(
    INITIAL_STATE,
    validateCreateProduct,
    handleCreate
  );

  return (
    <IonPage>
      <SmallHeader title="Submit" />
      <IonContent fullscreen>
        <LargeHeader title="Submit" />
        <IonItem lines="full">
          <IonLabel position="floating">Title</IonLabel>
          <IonInput
            name="title"
            value={values.title}
            type="text"
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Description</IonLabel>
          <IonInput
            name="description"
            value={values.description}
            type="text"
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">URL</IonLabel>
          <IonInput
            name="url"
            value={values.url}
            type="text"
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>

        <IonRow>
          <IonCol>
            <Upload
              files={thumb}
              onChange={setThumb}
              placeholder="Select Thumbnail"
            />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <Upload
              files={photos}
              onChange={setPhotos}
              placeholder="Select Product Photos"
              multiple
            />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonButton
              type="submit"
              color="warning"
              expand="block"
              disabled={submitting}
              onClick={handleSubmit}
            >
              Submit
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Submit;
