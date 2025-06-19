import React from "react";

import classes from "./CartCoupon.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";

export default function CartCoupon() {
  return <div className={classes.cart_coupon}>
    <input className={classes.cart_couponInput} placeholder="Enter your coupon"/>
    <button className={classes.cart_couponBtn}>
      <FontAwesomeIcon icon={faGift}/>
      <span>Apply coupon</span>
    </button>
  </div>;
}
