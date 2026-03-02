import api from "./api";

// EXAMS
export const createExam = (data) =>
  api.post("/exams/create", data);

export const getMyExams = () =>
  api.get("/exams/my-exams");

// QUESTIONS
export const getQuestions = (examId) =>
  api.get(`/questions/${examId}`);

export const addQuestion = (data) =>
  api.post("/questions/add", data);

// REVIEW
export const getExamSubmissions = (examId) =>
  api.get(`/review/exam/${examId}`);

export const overrideScore = (answerId, score) =>
  api.put(`/review/override/${answerId}`, { score });

// ANALYTICS
export const getTeacherAnalytics = (examId) =>
  api.get(`/analytics/teacher/${examId}`);

// PROFILE
export const getTeacherProfile = () =>
  api.get("/users/me");

export const updateTeacherProfile = (data) =>
  api.put("/users/update", data);