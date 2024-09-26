import axios from "axios";

const API_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: '/api',  // 프록시 설정에 맞춰 '/api'를 기본 URL로 사용
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
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

  

  //게시글 가져오기
  // getAllPosts() {
  //   return axios.get(`${API_URL}/post`).then((response) => response.data);
  // },

    // 페이징 처리해서 게시글 가져오기
    getAllPosts(page = 0, size = 10) {
      return api
        .get(`/post`, {
          params: { page: page, size: size },
        })
        .then((response) => response.data);
    },
  
    getPostById(id) {
      return api.get(`/post/${id}`).then((response) => response.data);
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
    return api.delete(`/post/${id}`);
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
    // '/HOMEPAGE/PROGRAM/IN/' 경로 제거
    const cleanFilename = filename.replace('/HOMEPAGE/PROGRAM/IN/', '');
    return `${API_URL}/programs/proxy-image?filename=${encodeURIComponent(cleanFilename)}`;
  },

  // 날씨
  getWeather(latitude, longitude) {
    return api.get('/weather', {
      params: { latitude, longitude }
    }).then(response => response.data); 
  },

  // park_info 리스트 가져오기
  getAllParks() {
    return api.get(`/outdoor`).then((response) => response.data);
  },

  //  park_info 상세 정보 가져오기
  getParkDetail(id) {
    return api.get(`/outdoor/${id}`).then((response) => response.data);
  },

  // 공원이미지 가져오기
  getParkImage(imageName) {
    if (!imageName) return '/path/to/default/image.jpg';
    const encodedImageName = encodeURIComponent(imageName);
    return `${API_URL}/images/outdoor/${encodedImageName}`;
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
  
  logout() {
    return api.post('/auth/logout').then(() => {
      this.removeAuthHeader();
    });
  },

  removeAuthHeader() {
    localStorage.removeItem('token');
  },

  // community
  getAllCommunityPosts() {
    return api.get('/community').then(response => response.data);
  },

  getCommunityPostById(id) {
    return api.get(`/community/${id}`).then(response => response.data);
  },

  createCommunityPost(postData) {
    return api.post('/community', postData).then(response => response.data);
  },

  updateCommunityPost(id, postData) {
    return api.put(`/community/${id}`, postData).then(response => response.data);
  },

  deleteCommunityPost(id) {
    return api.delete(`/community/${id}`);
  },
  
  // 교육 프로그램 전체 목록 가져오기
  getAllEducations() {
    return api.get('/education').then(response => response.data);
  },

  // 교육 프로그램 상세 정보 가져오기
  getEducationById(id) {
    return api.get(`/education/${id}`).then(response => response.data);
  },

  // 교육 프로그램 이미지 URL 가져오기
  getEducationImageUrl(imageName) {
    if (!imageName) return '/path/to/default/image.jpg';
    const encodedImageName = encodeURIComponent(imageName);
    return `${API_URL}/images/education/${encodedImageName}`;
  },
  // qna 댓글
  getCommentsByPostId(postId) {
    return api.get(`/comments/post/${postId}`).then(response => response.data);
  },

  addComment(commentData) {
    return api.post('/comments', commentData).then(response => response.data);
  },
  getBookmarks() {
    return api.get('/bookmarks').then(response => response.data);
  },

  toggleBookmark(bookmarkData) {
    return api.post('/bookmarks/toggle', bookmarkData).then(response => response.data);
  },

  // 리뷰
  getReviews(itemType, itemId) {
    return api.get(`/reviews`, { params: { itemType, itemId } });
  },

  postReview(itemType, itemId, content) {
    const formData = new FormData();
    formData.append('itemType', itemType);
    formData.append('itemId', itemId);
    formData.append('content', content);
    return api.post(`/reviews`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  },
  
};