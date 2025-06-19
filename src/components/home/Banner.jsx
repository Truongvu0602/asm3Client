import React, { Component } from "react";

import classes from "./Banner.module.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export default class Banner extends Component {
  render() {
    return (
      <Container fluid>
        <div
          className={classes.banner}
          style={{ backgroundImage: "url('/img/banner1.jpg')" }}
        >
          <div className={classes.banner_content}>
            <span className={classes.banner_subtext}>New Inspiration 2020</span>
            <h1 className={classes.banner_title}>20% off on new season</h1>
            <Link to="shop">
              <Button text="Browse collections" />
            </Link>
          </div>
        </div>
      </Container>
    );
  }
}
