import api from "./api";

export const getMyExams = () =>
  api.get("/exams/my-exams");