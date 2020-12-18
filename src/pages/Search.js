import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonSearchbar } from "@ionic/react";
import SmallHeader from "../components/Header/SmallHeader";
import LargeHeader from "../components/Header/LargeHeader";
import { productsRef } from "../firebase";
import ProductItem from "../components/Product/ProductItem";

const Search = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getInitialProducts();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [filter]);

  const getInitialProducts = () => {
    productsRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setProducts(items);
    });
  };

  const handleChange = (evt) => {
    if (evt.key === "Enter") {
      setFilter(evt.target.value);
    }
  };

  const handleSearch = () => {
    const query = filter.toLowerCase();
    const matchedProducts = products.filter((product) => {
      return (
        product.description.toLowerCase().includes(query) ||
        product.url.toLowerCase().includes(query) ||
        product.poastedBy.name.toLowerCase().includes(query)
      );
    });
    setFilteredProducts(matchedProducts);
  };
  return (
    <IonPage>
      <SmallHeader title="Search" />
      <IonContent fullscreen>
        <LargeHeader title="Search" />
        <IonSearchbar
          color="secondary"
          placeholder="Search"
          spellCheck="false"
          type="ur;"
          value={filter}
          onKeyPress={handleChange}
          animated
        ></IonSearchbar>
        {filteredProducts.map((filteredProduct, index) => (
          <ProductItem
            key={filteredProduct.id}
            showCount={false}
            product={filteredProduct}
            index={index}
            url={`/product/${filteredProduct.id}`}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Search;
