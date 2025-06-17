import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("authToken") || null,
    error: null,
    loginTimestamp: localStorage.getItem("loginTimestamp") ? 
      parseInt(localStorage.getItem("loginTimestamp")) : null,
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loginTimestamp = action.payload.loginTimestamp;
      state.error = null;

      // Store the token and user data in localStorage
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("userEmail", action.payload.user.email);
      localStorage.setItem("loginTimestamp", action.payload.loginTimestamp);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loginTimestamp = null;
      state.error = null;

      // Remove the token and user data from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("loginTimestamp");
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setAuthError } = authSlice.actions;

export default authSlice.reducer;
