import React, { useEffect, useState } from "react";

import classes from "./CheckoutOrder.module.css";
import CheckoutOrderList from "./CheckoutOrderList";
import { useSelector } from "react-redux";
import priceFormat from "../../utils/priceFormat";

export default function CheckoutOrder() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartQuant = useSelector((state) => state.cart.quant);

  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    let totalPrice = 0;
    cartItems.every((item) => (totalPrice += item.product.price * item.quantity));
    setOrderTotal(totalPrice);
  }, [cartItems, cartQuant]);

  return (
    <div className={classes.checkout_order}>
      <h3 className={classes.checkout_orderTitle}>Your order</h3>
      <CheckoutOrderList items={cartItems} />
      <div className={classes.checkout_orderTotal}>
        <p>Total</p>
        <span>{priceFormat(orderTotal)}</span>
      </div>
    </div>
  );
}
