import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import classes from "./Features.module.css";

export default function Features() {
  return (
    <Container fluid>
      <div className={classes.features_wrapper}>
        <Row>
          <Col sm={12} md={4}>
            <h3 className={classes.features_text}>FREE SHIPPING</h3>
            <p className={classes.features_smallText}>
              Free shipping worldwide
            </p>
          </Col>
          <Col sm={12} md={4}>
            <h3 className={classes.features_text}>24 X 7 SERVICE</h3>
            <p className={classes.features_smallText}>
              Free shipping worldwide
            </p>
          </Col>
          <Col sm={12} md={4}>
            <h3 className={classes.features_text}>FESTIVAL OFFER</h3>
            <p className={classes.features_smallText}>
              Free shipping worldwide
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
