import React, { useEffect, useState } from "react";

import classes from "./CartTotal.module.css";

import { useSelector } from "react-redux";

import priceFormat from "../../utils/priceFormat";
import CartCoupon from "./CartCoupon";

export default function CartTotal() {

  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartQuant = useSelector(state => state.cart.quantity);

  useEffect(() => {
    let totalPrice = 0;
    cartItems && cartItems.every((item) => (totalPrice += item.product.price * item.quantity));
    setTotalCartPrice(totalPrice);
  }, [cartItems, cartQuant]);

  return (
    <div className={classes.cartTotal}>
      <h1 className={classes.cartTotal_title}>Cart total</h1>
      <div className={classes.cartTotal_subtotal}>
        <p className={classes.cartTotal_subtotalText}>Subtotal</p>
        <p className={classes.cartTotal_subtotalPrice}>
          {priceFormat(totalCartPrice)}
        </p>
      </div>
      <hr></hr>
      <div className={classes.cartTotal_total}>
        <p className={classes.cartTotal_totalText}>total</p>
        <p className={classes.cartTotal_totalPrice}>
          {priceFormat(totalCartPrice)}
        </p>
      </div>
      <CartCoupon />
    </div>
  );
}
