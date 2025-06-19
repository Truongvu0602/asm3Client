import React from "react";

import classes from "./ShopProductItem.module.css";
import { useNavigate } from "react-router-dom";

export default function ShopProductItem(props) {

  const navigate = useNavigate();

  return (
    <div className={`${classes.product_item} image-fluid`} onClick={() => {navigate(`/detail/${props.item._id}`)} } >
      <div
        className={classes.product_img}
      >
        <img src={props.item.images[0]} alt={props.item.name} />
      </div>
      <div className={classes.product_name}>{props.item.name}</div>
      <div className={classes.product_price}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(props.item.price)}
      </div>
    </div>
  );
}

