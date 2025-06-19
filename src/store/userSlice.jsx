import { createSlice } from "@reduxjs/toolkit";

const userState = { isLogin: false , userInfo : null };

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    onLogin(state, action) {
      state.isLogin = true;
      state.userInfo = action.payload;
    },
    onLogout(state) {
      state.isLogin = false;
      state.userInfo = {};
    }
  }
});


export const userActions = userSlice.actions;
export default userSlice.reducer;