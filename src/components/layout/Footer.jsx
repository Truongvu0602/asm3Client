import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";

import FooterItem from "./FooterItem";

import classes from './Footer.module.css'

export default class Footer extends Component {
  render() {
    return (
      <div className={classes.footer}>
        <Container>
          <Container fluid>
            <Row>
              <Col>
                <FooterItem
                  title="Customer Services"
                  text1="Help & Contact Us"
                  text2="Returns & Refunds"
                  text3="Online Stores"
                  text4="Terms & Conditions"
                />
              </Col>
              <Col>
                <FooterItem
                  title="Customer Services"
                  text1="Help & Contact Us"
                  text2="Returns & Refunds"
                  text3="Online Stores"
                  text4="Terms & Conditions"
                />
              </Col>
              <Col>
                <FooterItem
                  title="Customer Services"
                  text1="Help & Contact Us"
                  text2="Returns & Refunds"
                  text3="Online Stores"
                  text4="Terms & Conditions"
                />
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }
}
