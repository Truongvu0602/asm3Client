import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_HOST = import.meta.env.VITE_SERVER;

const orderState = { orders: [] };

const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, thunkAPI) => {
    try {
      const response = await axios.post(`${SERVER_HOST}/order/`, order, {
        withCredentials: true,
      });
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getOrder = createAsyncThunk("order/getOrder", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${SERVER_HOST}/order/`, {
      withCredentials: true,
    });
    if (response.status !== 200) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: orderState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.orders = action.payload.orders;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          console.log(action.payload);
        }
      })

      .addCase(getOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          console.log(action.payload);
        }
      });
  },
});

export default orderSlice.reducer;
export { createOrder, getOrder };
