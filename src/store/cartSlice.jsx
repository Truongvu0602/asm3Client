import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const cartState = { cartItems: [], cartQuant: 0, error: null, loading: false };
const SERVER_HOST = import.meta.env.VITE_SERVER;

export const editCart = createAsyncThunk(
  "cart/editCart",
  async ({ item, quant }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${SERVER_HOST}/cart/edit`,
        {
          productId: item._id,
          quantity: quant,
        },
        { withCredentials: true }
      );

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }
      return response.data.userCart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${SERVER_HOST}/cart/get-cart`,
        { userId: userId },
        {
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data.message);
      } else {
        return response.data.userCart;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({ item }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${SERVER_HOST}/cart/remove`,
        {
          productId: item._id,
        },
        { withCredentials: true }
      );

      if (response.status !== 200) {
        console.log(response.data);
        return thunkAPI.rejectWithValue(response.data.message);
      }
      console.log("removeItemFromCart: Success", response.data);
      return response.data.userCart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: cartState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload.products;
      state.cartQuant = action.payload.quant;
    },
  },
  extraReducers: (builder) => {
    builder
      // editCart
      .addCase(editCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          state.cartItems = action.payload.products;
          state.cartQuant = action.payload.total;
        }
      })
      .addCase(editCart.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      })

      // getUserCart
      .addCase(getUserCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          state.cartItems = action.payload.products;
          state.cartQuant = action.payload.total;
        } else {
          state.cartItems = [];
          state.cartQuant = 0;
        }
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      })

      // removeItemFromCart
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cartItems = action.payload.products;
        state.cartQuant = action.payload.total;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
