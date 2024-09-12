import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  getAllPosts() {
    return axios.get(`${API_URL}/post`).then(response => response.data);
  },

  getPostById(id) {
    return axios.get(`${API_URL}/post/${id}`).then(response => response.data);
  },

  createPost(formData) {
    return api.post('/post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => response.data);
  },

  updatePost(id, post) {
    return axios.put(`${API_URL}/post/${id}`, post).then(response => response.data);
  },

  deletePost(id) {
    return axios.delete(`${API_URL}/post/${id}`);
  },

  getAllPrograms() {
    return api.get('/programs/all').then((response) => response.data);
  }
  
};