import React from "react";

import classes from "./CartTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import priceFormat from "../../utils/priceFormat";

import {
  faTrashCan,
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  cartActions,
  editCart,
  removeItemFromCart,
} from "../../store/cartSlice";

export default function CartTable() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  const onChangeItemQuant = (item, e) => {
    try {
      dispatch(editCart({ item, quant: e.target.value }));
    } catch (error) {
      console.log(error);
    }
  };

  const onIncreaseItemQuant = (item) => {
    try {
      dispatch(editCart({ item: item, quant: 1 }));
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteItem = (item) => {
    try {
      dispatch(removeItemFromCart({ item }));
    } catch (error) {
      console.log(error);
    }
  };

  const onDecreaseItemQuant = (item) => {
    dispatch(editCart({ item: item, quant: -1 }));
  };

  return (
    cartItems &&
    cartItems.length > 0 && (
      <div>
        <div className="overflow-scroll">
          <table className={`${classes.cart_table}`}>
            <thead>
              <tr className={classes.cart_tableHeaders}>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 ? (
                cartItems.map((items) => (
                  <tr key={items.product._id} className={classes.cart_item}>
                    <td>
                      <img
                        alt="Product cart"
                        className={`${classes.cart_itemImg} img-fluid`}
                        src={items.product.images[0]}
                      />
                    </td>
                    <td>
                      <p
                        title={items.product.name}
                        className={`${classes.cart_itemName} w-20`}
                      >
                        {items.product.name}
                      </p>
                    </td>
                    <td>
                      <p className={classes.cart_itemPrice}>
                        {priceFormat(items.product.price)}
                      </p>
                    </td>
                    <td className={classes.cart_itemQuant}>
                      <div className={classes.cart_inputWrapper}>
                        <FontAwesomeIcon
                          className={classes.cart_left}
                          icon={faAngleLeft}
                          onClick={() => {
                            onDecreaseItemQuant(items.product);
                          }}
                        />
                        <input
                          type="number"
                          min={1}
                          max={999}
                          minLength={0}
                          value={items.quantity}
                          className={classes.cart_input}
                          onChange={(e) => {
                            onChangeItemQuant(items.product, e);
                          }}
                          onBlur={(e) => {
                            onChangeItemQuant(items.product, e);
                          }}
                        />
                        <FontAwesomeIcon
                          className={classes.cart_right}
                          icon={faAngleRight}
                          onClick={() => {
                            onIncreaseItemQuant(items.product);
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <p className={classes.cart_itemTotalPrice}>
                        {priceFormat(items.product.price * items.quantity)}
                      </p>
                    </td>
                    <td className={classes.cart_itemRemove}>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={() => {
                          onDeleteItem(items.product);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <p className="text-center text-secondary">
                  You have no item in cart
                </p>
              )}
            </tbody>
          </table>
        </div>
        <div className={classes.cart_footer}>
          <Link to="/shop" className={classes.cart_footerContentLeft}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Continue shopping</span>
          </Link>
          <div className={classes.cart_footerContentRight}>
            {cartItems.length > 0 && (
              <Link
                to="/checkout"
                className={classes.cart_footerContentRightBtn}
              >
                Checkout
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  );
}
