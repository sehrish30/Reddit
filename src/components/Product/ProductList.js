import React, { useCallback, useEffect, useState } from "react";
import { db } from "../../firebase";
import ProductItem from "./ProductItem.js";
import formatDate from "date-fns/format";
import isYesterday from "date-fns/isYesterday";
import isToday from "date-fns/isToday";
import { useLocation } from "react-router-dom";
import { IonItem, IonLabel } from "@ionic/react";

const ProductList = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  const isTrending = location.pathname.includes("trending");

  const getProducts = useCallback(() => {
    if (isTrending) {
      return db
        .collection("products")
        .orderBy("voteCount", "desc")
        .onSnapshot(handleSnapshot);
    }

    return db
      .collection("products")
      .orderBy("created", "desc")
      .onSnapshot(handleSnapshot);
  }, [isTrending]);

  useEffect(() => {
    const unsubscribe = getProducts();
    return () => {
      unsubscribe();
    };
  }, [isTrending, getProducts]);

  // maps over snapshot and returns individual document
  const handleSnapshot = (snapshot) => {
    const products = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setProducts(products);
  };

  let prevDate = null;

  return products.map((product, index) => {
    const result = [
      <ProductItem
        key={product.id}
        showCount={true}
        url={`/product/${product.id}`}
        index={index + 1}
        product={product}
      />,
    ];
    const currentDate = isToday(product.created)
      ? "Today"
      : isYesterday(product.created)
      ? "Yesterday"
      : formatDate(product.created, "MMM d");

    if (currentDate !== prevDate && !isTrending) {
      result.unshift(
        <IonItem color="medium" lines="none" key={currentDate}>
          <IonLabel>
            <strong>{currentDate}</strong>
          </IonLabel>
        </IonItem>
      );
      prevDate = currentDate;
    }

    return result;
  });
};

export default ProductList;
