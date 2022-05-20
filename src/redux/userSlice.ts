import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "user",
  initialState: {
    token: "",
    isLogged: false,
  },
  reducers: {
    logIn(state, { payload }) {
      return { ...state, isLogged: true, token: payload };
    },
    logOut(state) {
      return { ...state, isLogged: false, token: "" };
    },
  },
});

export const { logIn, logOut } = slice.actions;

export const selectUser = (state: any) => state.user;

export default slice.reducer;
