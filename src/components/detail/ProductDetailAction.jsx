import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import classes from "./ProductDetailAction.module.css";
import { useDispatch, useSelector } from "react-redux";
import {  editCart } from "../../store/cartSlice";

export default function ProductDetailAction(props) {
  const [itemQuant, setItemQuant] = useState(1);
  const [user, setUser] = useState({});

  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.user.isLogin);
  const userInfo = useSelector((state) => state.user.userInfo);
  const cartStates = useSelector((state) => state.cart);

  useEffect(() => {
    setUser({...userInfo});
  }, [isLoggedIn]);

  const increaseQuant = () => {
    setItemQuant((prevQuant) => prevQuant + 1);
  };

  const decreaseQuant = () => {
    if (itemQuant > 1) {
      setItemQuant((prevQuant) => prevQuant - 1);
    }
  };

  const onChangeQuantHandler = (e) => {
    if(e.target.value <= 0) {
      return alert("Quantity must be greater than 0");
    }
    setItemQuant(e.target.value);
  };

  const addToCartHandler = async () => {
    if (!isLoggedIn) {
      return alert("Please login first !");
    }
    dispatch(editCart({quant : itemQuant, item: props.cartItem, user: user}));
    if(cartStates.error) {
      return alert(cartStates.error);
    }
    setItemQuant(1);
  };
  return (
    <div className={classes.detailAction}>
      <div className={classes.detailAction_quantity}>
        <span className={classes.detailAction_text}>Quantity : </span>
        <div className={classes.detailAction_inputWrapper}>
          <FontAwesomeIcon
            className={classes.detailAction_left}
            icon={faAngleLeft}
            onClick={decreaseQuant}
          />
          <input
            type="number"
            value={itemQuant}
            onChange={onChangeQuantHandler}
            className={classes.detailAction_input}
          />
          <FontAwesomeIcon
            className={classes.detailAction_right}
            icon={faAngleRight}
            onClick={increaseQuant}
          />
        </div>
      </div>
      <button className={classes.detailAction_btn} onClick={addToCartHandler}>
        Add to cart
      </button>
    </div>
  );
}
