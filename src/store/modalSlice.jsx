import { createSlice } from "@reduxjs/toolkit";

const modalState = { show: false, item: {} };

const modalSlice = createSlice({
  name: 'modal',
  initialState: modalState,
  reducers : {
    showModal(state,action) {
      state.show = true;
      state.item = action.payload;
    },
    hideModal(state) {
      state.show = false;
      state.item = {};
    }
  }
})


export const modalActions = modalSlice.actions;
export default modalSlice.reducer;