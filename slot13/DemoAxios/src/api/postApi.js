// src/api/postApi.js – NC2.4: Tách các hàm gọi API ra postApi: getAll, getById, create, update, patch, remove
import axiosClient from './axiosClient';

const postApi = {
  getAll: (params, signal) => axiosClient.get('/posts', { params, signal }),
  getById: (id, signal) => axiosClient.get(`/posts/${id}`, { signal }),
  getComments: (id, signal) => axiosClient.get(`/posts/${id}/comments`, { signal }),
  getUserById: (userId, signal) => axiosClient.get(`/users/${userId}`, { signal }),
  create: (data) => axiosClient.post('/posts', data),
  update: (id, data) => axiosClient.put(`/posts/${id}`, data),
  patch: (id, data) => axiosClient.patch(`/posts/${id}`, data),
  remove: (id) => axiosClient.delete(`/posts/${id}`),
};

export default postApi;