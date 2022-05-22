import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

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

export const selectUser = (state: RootState) => state.user;

export default slice.reducer;
