import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true
});

export const loginUser = (data) => API.post("/login", data);
export const registerUser = (data) => API.post("/register", data);
export const verifyOTP = (data) => API.post("/verify-otp", data);
export const forgotPassword = (data) => API.post("/forgot-password", data);
export const resetPassword = (data) => API.post("/reset-password", data);
export const resendOTP = (data) => API.post("/resend-otp", data);
export const logoutUser = () => API.post("/logout");

// import axios from "axios";

// const AUTH_API = axios.create({
//   baseURL: "http://localhost:5000/api/auth",
//   withCredentials: true,
// });

// export const loginUser = async (data) => {
//   const res = await AUTH_API.post("/login", data);

//   // Save token manually (important)
//   if (res.data.token) {
//     localStorage.setItem("token", res.data.token);
//   }

//   return res.data;
// };

// export const registerUser = (data) =>
//   AUTH_API.post("/register", data);

// export const verifyOTP = (data) =>
//   AUTH_API.post("/verify-otp", data);

// export const forgotPassword = (data) =>
//   AUTH_API.post("/forgot-password", data);

// export const resetPassword = (data) =>
//   AUTH_API.post("/reset-password", data);

// export const resendOTP = (data) =>
//   AUTH_API.post("/resend-otp", data);

// export const logoutUser = async () => {
//   localStorage.removeItem("token");
//   return AUTH_API.post("/logout");
// };