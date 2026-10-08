import api from './api';

export const departmentApi = {
  getAll: () => api.get('/departments'),
  create: (data) => api.post('/departments', data),
  update: (id, data) => api.put(`/departments/${id}`, data),
  delete: (id) => api.delete(`/departments/${id}`)
};

export const performanceApi = {
  getAll: (params) => api.get('/performance', { params }),
  create: (data) => api.post('/performance', data)
};

export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats'),
  getAttendanceChart: () => api.get('/dashboard/attendance-chart'),
  getTaskStatistics: () => api.get('/dashboard/task-statistics'),
  getProjectProgress: () => api.get('/dashboard/project-progress'),
  getRecentActivity: () => api.get('/dashboard/recent-activity')
};

export const notificationApi = {
  getAll: () => api.get('/notifications'),
  markRead: (id) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all')
};

export const reportApi = {
  getSummary: (reportType, deptId) => api.get('/reports/summary', { params: { report_type: reportType, department_id: deptId } })
};
