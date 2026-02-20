import api from "./api";

export const getAnswersByExam = (examId) =>
  api.get(`/review/exam/${examId}`);

export const overrideAnswer = (answerId, data) =>
  api.put(`/review/override/${answerId}`, data);

export const getAuditLogs = (answerId) =>
  api.get(`/review/audit/${answerId}`);