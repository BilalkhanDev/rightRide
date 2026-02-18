import { createSlice } from "@reduxjs/toolkit";
import { loginEffect, meEffect } from "./auth.thunk";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  role: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginEffect.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginEffect.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginEffect.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(meEffect.pending, (state) => {
        state.loading = true;
      })
      .addCase(meEffect.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.initialized = true;
      })
      .addCase(meEffect.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.initialized = true;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
