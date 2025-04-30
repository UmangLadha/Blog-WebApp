import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User { // defineing the structure of User
  userName: string;
  userFullname: string;
  userEmail: string;
  userPassword: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null; //using the type union which ensures the user can carry a valid user data or null.
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};
export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    //Using the PayloadAction type to tell typescript what content slice login will carry
    login: (state, actions: PayloadAction<User>) => {
      state.isLoggedIn = true; // it tells that user has successfully logged in
      state.user = actions.payload; // saving userdata in initial state
    },
    logout: (state) => {
      state.isLoggedIn = false; //setting isloggedIn value to false
      state.user = null; //clearing user
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
