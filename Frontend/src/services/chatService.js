import API from "./api";

export const getChatHistory = (userId) =>
  API.get(`/chat/${userId}`);