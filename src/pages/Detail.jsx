import React, { useEffect, useState } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import ProductDetail from "../components/detail/ProductDetail";

export default function Detail() {
  const data = useRouteLoaderData("root");
  const [relatedItems, setRelatedItems] = useState([]);
  const [filteredItem, setFilteredItem] = useState(null);
  const [productsData, setProductsData] = useState([]);

  const param = useParams();
  const prodId = param.id;


  useEffect(() => {
    if (data && data.products) {
      setProductsData(data.products);
    }
  }, [data]);

  // Update filteredItem when productsData or prodId changes
  useEffect(() => {
    if (productsData.length > 0 && prodId) {
      setFilteredItem(productsData.find((prod) => prod._id === prodId));
    }
  }, [productsData, prodId]);

  // Update relatedItems when filteredItem changes
  useEffect(() => {
    if (filteredItem) {
      const newRelatedItems = productsData.filter(
        (prod) =>
          prod.category === filteredItem.category && prod._id !== prodId
      );
      setRelatedItems(newRelatedItems);
    }
  }, [filteredItem, productsData, prodId]);

  return (
    <div>
      {
        filteredItem && relatedItems && <ProductDetail product={filteredItem} relatedProducts={relatedItems} />
      }
    </div>
  );
}
