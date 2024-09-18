import axios from "axios";

const API_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  getAllPosts() {
    return axios.get(`${API_URL}/post`).then((response) => response.data);
  },

  getPostById(id) {
    return axios.get(`${API_URL}/post/${id}`).then((response) => response.data);
  },

  createPost(formData) {
    return api
      .post("/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },

  updatePost(id, formData) {
    return api
      .put(`/post/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },

  deletePost(id) {
    return axios.delete(`${API_URL}/post/${id}`);
  },

  getAllPrograms() {
    return api.get("/programs/all").then((response) => response.data);
  },

  // 프로그램 상세 정보 가져오기
  getProgramDetail(type, svcid) {
    return api.get(`/programs/detail/${type}/${svcid}`);
  },

  // 이미지 URL 프록시
  getProxyImageUrl(filename) {
    return `${API_URL}/programs/proxy-image?filename=${encodeURIComponent(
      filename
    )}`;
  },

  // park_info 리스트 가져오기
  getAllParks() {
    return axios.get(`${API_URL}/outdoor`).then((response) => response.data);
  },

  //  park_info 상세 정보 가져오기
  getParkDetail(id) {
    return axios
      .get(`${API_URL}/outdoor/${id}`)
      .then((response) => response.data);
  },

  // 공원이미지 가져오기
  getParkImage(imageName) {
    return `${API_URL}/outdoorImages/${imageName}`;
  },

  login(username, password) {
    return api.post('/auth/login', { username, password });
  },

  register(name, phoneNumber, username, email, password) {
    return api.post('/auth/register', { name, phoneNumber, username, email, password });
  },

  setAuthHeader(token) {
    localStorage.setItem('token', token);
  },

  removeAuthHeader() {
    localStorage.removeItem('token');
  },
};
