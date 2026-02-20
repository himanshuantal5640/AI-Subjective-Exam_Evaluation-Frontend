import api from "./api";

export const loginUser = (data) =>
  api.post("/auth/login", data);

export const registerUser = (data) =>
  api.post("/auth/register", data);

export const verifyOTP = (data) =>
  api.post("/auth/verify-otp", data);

export const getProfile = () =>
  api.get("/users/me");

export const logoutUser = () =>
  api.post("/auth/logout");

export const resendOTP = (data) =>
  api.post("/auth/resend-otp", data);