import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logInToken: localStorage.getItem("token") || {},
  isLoggedIn: false,
  user: null,
};
export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true; // tell that user has successfully logged in 
      state.logInToken = action.payload.token; // providing the token to the state
      state.user = action.payload.userData; // passing the data to the state
      localStorage.setItem("token", action.payload.token); // setting the token in localstorage
    //   localStorage.setItem("userData", JSON.stringify(action.payload.userData)); //and also setting the userdata to localstorage in string format
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.logInToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
