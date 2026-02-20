import api from "./api";

export const getQuestionsByExam = (examId) =>
  api.get(`/questions/${examId}`);