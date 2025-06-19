import React from "react";
import { Col, Container, Row } from "react-bootstrap";

// import classes from './ShopProductList.module.css'
import ShopProductItem from "./ShopProductItem";
import { RotatingLines } from "react-loader-spinner";

export default function ShopProductList(props) {

  return (
    <Container className="pt-3" fluid>
    <RotatingLines
      strokeColor="black"
      strokeWidth=""
      visible={!props.products}
    />
      <Row>
        {props.products && props.products.map((product) => (
          <Col xs={12} sm={6} md={4} key={product._id} >
            <ShopProductItem item={product}  />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
