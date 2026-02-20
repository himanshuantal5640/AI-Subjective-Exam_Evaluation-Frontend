import api from "./api";

export const getSystemAnalytics = () =>
  api.get("/admin/system-analytics");

export const getUsers = () =>
  api.get("/admin/users");

export const updateUserRole = (userId, role) =>
  api.put(`/admin/users/${userId}/role`, { role });

export const deactivateUser = (userId) =>
  api.put(`/admin/users/${userId}/deactivate`);

export const getAuditLogs = () =>
  api.get("/admin/audit-logs");