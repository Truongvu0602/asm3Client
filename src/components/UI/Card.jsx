import React from "react";

import classes from "./Card.module.css";

export default function Card(props) {
  return (
    <div className={classes.card}>
      <div className={classes.card_headerTitle}>{props.title}</div>
      <div className={classes.card_content}>{props.children}</div>
    </div>
  );
}
