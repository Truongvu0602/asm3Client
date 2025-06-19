import React from "react";

import classes from "./ShoppingCart.module.css";
import PageHeader from "../layout/PageHeader";
import { Col, Container, Row } from "react-bootstrap";
import CartTable from "./CartTable";
import CartTotal from "./CartTotal";

export default function ShoppingCart() {
  return (
    <div>
      <PageHeader text="Cart" />
      <Container fluid>
      <h3 className={`${classes.cart_title} table`}>Shopping cart</h3>
        <Row>
          <Col md={8}>
            <CartTable/>
          </Col>
          <Col md={4}>
            <CartTotal/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
