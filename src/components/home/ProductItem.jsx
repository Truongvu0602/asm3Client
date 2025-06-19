import React from "react";

import classes from "./ProductItem.module.css";
import { modalActions } from "../../store/modalSlice";
import { useDispatch } from "react-redux";

export default function ProductItem({ item }) {
  const dispatch = useDispatch();

  const callModal = () => {
    dispatch(modalActions.showModal(item));
  };

  return (
    <div className={`${classes.product_item} image-fluid`} onClick={callModal}>
      <div
        className={classes.product_img}
        // style={{ backgroundImage: `url(${item.images[0]})` }}
      >
        <img src={item.images[0]} alt="product img" />
      </div>
      <div className={classes.product_name}>{item.name}</div>
      <div className={classes.product_price}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(item.price)}
      </div>
    </div>
  );
}
