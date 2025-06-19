import React from "react";

import classes from "./ProductDetailDesc.module.css";

export default function ProductDetailDesc(props) {

  const description = props.description;

  let detailDesc = [];
  let header = "";
  if (description) {
    if(description.includes('-')) {
      detailDesc = description.split("-") || description;
    } else if (description.includes('•')) {
      detailDesc = description.split("•") || description;
    } else {
      detailDesc = [description];
    }
    header = detailDesc.shift() || "";
  }

  return (
    <div className={classes.productDescription}> 
      <div className={classes.productDescription_header}>
        <div className={classes.productDescription_title}>Description</div>
        <p className={classes.productDescription_text}>Product description</p>
      </div>
      <h5 className={classes.productDescription_contentHeader}>{header}</h5>
      {detailDesc.map((desc) => (
        <p key={desc}>- {desc}</p>
      ))}
    </div>
  );
}
