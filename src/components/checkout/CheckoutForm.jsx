import React, { useState } from "react";
import classes from "./CheckoutForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../store/orderSlice";
import { cartActions, getUserCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const [form, setForm] = useState({
    address: "",
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const fieldsChangeHandler = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const totalPrices = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Họ tên là bắt buộc.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email là bắt buộc.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email không đúng định dạng.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Số điện thoại là bắt buộc.";
    } else if (!/^0\d{9,10}$/.test(form.phone)) {
      newErrors.phone =
        "Số điện thoại không hợp lệ (phải bắt đầu bằng 0 và có 10-11 số).";
    }

    if (!form.address.trim()) {
      newErrors.address = "Địa chỉ là bắt buộc.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkOutHandler = () => {
    if (!validateForm()) return;

    dispatch(
      createOrder({
        userCart: cartItems,
        orderTotalPrice: totalPrices(),
        address: form.address,
        name: form.name,
        phone: form.phone,
        email: form.email,
      })
    );

    dispatch(getUserCart({ userId: user.userInfo.id }));
    dispatch(cartActions.setCartItems({ products: [], quant: 0 }));

    navigate("/order");
  };

  return (
    <div className={classes.checkout_form}>
      <div className={classes.checkout_formControl}>
        <label className={classes.checkout_formLabel}>Full name :</label>
        <input
          className={classes.checkout_formInput}
          type="text"
          name="name"
          placeholder="Enter your fullname here !"
          onChange={fieldsChangeHandler}
          value={form.name}
        />
        {errors.name && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.name}</p>
        )}
      </div>

      <div className={classes.checkout_formControl}>
        <label className={classes.checkout_formLabel}>Email :</label>
        <input
          className={classes.checkout_formInput}
          name="email"
          type="text"
          placeholder="Enter your email here !"
          value={form.email}
          onChange={fieldsChangeHandler}
        />
        {errors.email && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.email}</p>
        )}
      </div>

      <div className={classes.checkout_formControl}>
        <label className={classes.checkout_formLabel}>Phone :</label>
        <input
          className={classes.checkout_formInput}
          type="text"
          name="phone"
          placeholder="Enter your phone here !"
          value={form.phone}
          onChange={fieldsChangeHandler}
        />
        {errors.phone && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.phone}</p>
        )}
      </div>

      <div className={classes.checkout_formControl}>
        <label className={classes.checkout_formLabel}>Address :</label>
        <input
          onChange={fieldsChangeHandler}
          value={form.address}
          className={classes.checkout_formInput}
          type="text"
          name="address"
          placeholder="Enter your address here !"
        />
        {errors.address && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.address}</p>
        )}
      </div>

      <button onClick={checkOutHandler} className={classes.checkout_formBtn}>
        Place order
      </button>
    </div>
  );
}
