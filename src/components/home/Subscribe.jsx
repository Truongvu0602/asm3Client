import React from "react";

import classes from "./Subscribe.module.css";
import { Col, Container, Row } from "react-bootstrap";

export default function Subscribe() {
  return (
    <Row>
      <Col>
        <div className={classes.sub_text}>
          <h3 className={classes.sub_title}>LET'S BE FRIENDS!</h3>
          <p className={classes.sub_smallText}>Subcribe to get lastest news.</p>
        </div>
      </Col>
      <Col>
        <div className={classes.sub_formWrapper}>
          <div className={classes.sub_form}>
            <div className={classes.sub_formControlInline}>
              <input
                className={classes.sub_formInput}
                type="text"
                placeholder="Enter your email"
              />
              <button className={classes.sub_formButton}>Subcribe</button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
