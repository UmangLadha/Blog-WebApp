import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user:null,
};
export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state,actions) => {
      state.isLoggedIn = true; // it tells that user has successfully logged in
	  state.user = actions.payload; // saving userdata in initial state
    },
    logout: (state) => {
      state.isLoggedIn = false; //setting isloggedIn value to false
	  state.user = null //clearing user 
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
