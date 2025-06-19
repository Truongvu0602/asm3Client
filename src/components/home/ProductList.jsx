import React from "react";
import ProductItem from "./ProductItem";
import { Col, Container, Row } from "react-bootstrap";

import classes from "./ProductList.module.css";

export default function ProductList({ products }) {
  console.log(products);

  products = products.products;
  return (
    <>
      <div className={classes.product_list_header}>
        <span className={classes.product_list_subText}>Made the hard way</span>
        <h2 className={classes.product_list_title}>Top trending products</h2>
      </div>
      <Row>
        {products &&
          products.map((product) => (
            <Col xs={12} sm={6} md={3} key={product._id}>
              <ProductItem item={product} />
            </Col>
          ))}
      </Row>
    </>
  );
}
