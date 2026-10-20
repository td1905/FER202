// src/api/axiosClient.js – NC2: axios instance và interceptors
import axios from 'axios';

// NC2.1: Cấu hình axios instance với baseURL, timeout, headers
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// NC2.2: Request interceptor – log method + url, gắn Authorization Bearer token nếu có
axiosClient.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: new Date() };
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`[NC2 - Request] ${config.method?.toUpperCase()} => ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// NC2.3: Response interceptor – đo thời gian xử lý (ms) và dịch lỗi sang tiếng Việt
axiosClient.interceptors.response.use(
  (response) => {
    const startTime = response.config?.metadata?.startTime;
    const elapsed = startTime ? new Date() - startTime : 0;
    console.log(`[NC2 - Response] ${response.config.url} xử lý trong ${elapsed} ms`);
    return response;
  },
  (error) => {
    // Nếu request bị hủy bởi AbortController (NC4), giữ nguyên error để axios.isCancel nhận diện được
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    let message = 'Có lỗi xảy ra, vui lòng thử lại';
    if (error.code === 'ECONNABORTED') {
      message = 'Hết thời gian phản hồi từ máy chủ (timeout)';
    } else if (!error.response) {
      message = 'Không kết nối được server, vui lòng kiểm tra mạng';
    } else {
      switch (error.response.status) {
        case 400: message = 'Yêu cầu không hợp lệ'; break;
        case 401: message = 'Chưa xác thực, vui lòng đăng nhập lại'; break;
        case 403: message = 'Bạn không có quyền thực hiện hành động này'; break;
        case 404: message = 'Không tìm thấy dữ liệu yêu cầu (404)'; break;
        case 500: message = 'Máy chủ nội bộ gặp lỗi (500)'; break;
        default:  message = `Lỗi từ máy chủ (${error.response.status})`;
      }
    }
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;