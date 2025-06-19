import Banner from "../components/home/Banner";

import React from "react";
import ProductCategory from "../components/home/ProductCategory";
import { useRouteLoaderData } from "react-router-dom";
import ProductList from "../components/home/ProductList";
import Features from "../components/home/Features";
import Subscribe from "../components/home/Subscribe";

export default function Home() {
  const data = useRouteLoaderData("root");


  return (
    <div className="pb-3">      
      <Banner />
      <ProductCategory />
      <ProductList products={data} />
      <Features/>
      <Subscribe/>
    </div>
  );
}
