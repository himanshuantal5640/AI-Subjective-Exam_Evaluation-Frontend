import api from "./api";

export const getStudentAnalytics = () =>
  api.get("/analytics/student");