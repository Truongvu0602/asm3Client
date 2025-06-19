import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "./modalSlice";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
    cart: cartReducer,
    orderReducer: orderReducer,
  },
});

export default store;
