import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import classes from "./CheckoutContent.module.css";
import CheckoutForm from "./CheckoutForm";
import CheckoutOrder from "./CheckoutOrder";

export default function CheckoutContent() {


  return (
    <Container fluid className="my-3">
      <h3 className={classes.checkout_headerTitle}>Billing Details</h3>
      <div className={classes.checkout_wrapper}>
        <Row>
          <Col md={8}>
            <CheckoutForm/>
          </Col>
          <Col md={4}>
            <CheckoutOrder/>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
