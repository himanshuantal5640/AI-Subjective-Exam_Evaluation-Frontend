import api from "./api";

export const getMyResults = () =>
  api.get("/answers/my-results");