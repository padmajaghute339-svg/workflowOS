import api from './api';

export const leaveApi = {
  getAll: (params) => api.get('/leaves', { params }),
  create: (data) => api.post('/leaves', data),
  approve: (id) => api.post(`/leaves/${id}/approve`),
  reject: (id, data) => api.post(`/leaves/${id}/reject`, data)
};
