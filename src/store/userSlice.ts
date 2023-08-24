import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    username: "",
    userid: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.userid = action.payload.userid;
      return state;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = "";
      state.userid = "";
      return state;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
