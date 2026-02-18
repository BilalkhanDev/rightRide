import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, me, signup } from "./auth.api";
import { toast } from "../../components/Toast/Toast";

export const loginEffect = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await login(payload);

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      await dispatch(meEffect()).unwrap();
      toast.success("Login successful");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid Credentials");
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const signupEffect = createAsyncThunk(
  "auth/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await signup(payload);
      toast.success("Signup successful");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

export const meEffect = createAsyncThunk(
  "auth/me",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await me();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Me failed");
    }
  }
);