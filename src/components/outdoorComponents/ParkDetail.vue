<template>
    <div v-if="content" class="content-detail">
      <h2 class="service-name">{{ content.name }}</h2>
      <div class="content-wrapper">
        <div class="image-container">
          <img :src="getParkImage(content.imagePath)" :alt="content.name" v-if="content.imagePath">
          <div class="action-buttons">
            <button class="map-button">지도보기</button>
            <button class="like-button">♡</button>
            <button class="bookmark-button">🔖</button>
          </div>
        </div>
        <div class="info-container">
          <div class="info-item">
            <span class="label">주소 :</span>
            <span class="value">{{ content.address }}</span>
          </div>
          <div class="info-item">
            <span class="label">문의처 :</span>
            <span class="value">{{ content.phone }}</span>
          </div>
          <div class="info-item">
            <span class="label">특징 :</span>
            <span class="value">{{ content.feature }}</span>
          </div>
          <div class="info-item">
            <span class="label">운영정보 :</span>
            <span class="value">{{ content.opr_info }}</span>
          </div>
          <div class="info-item">
            <span class="label">운영시간 :</span>
            <span class="value">{{ content.opr_hours }}</span>
          </div>
          <div class="info-item">
            <span class="label">입장료 :</span>
            <span class="value">{{ content.ent_fee }}</span>
          </div>
          <div class="info-item">
            <a :href="content.web_url" target="_blank" class="reservation-button">예약하기</a>
          </div>
        </div>
      </div>
      
      <div class="review-section">
        <h3>리뷰쓰기</h3>
        <textarea placeholder="리뷰를 작성해주세요"></textarea>
      </div>
    </div>
    <div v-else-if="error" class="error-message">
    {{ error }}
  </div>
    <div v-else>Loading...</div>
    
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import api from '@/services/api';
  
  const route = useRoute();
  const content = ref(null);
  const error = ref(null);

  
  const fetchContentDetail = async () => {
  try {
    const response = await api.getParkDetail(route.params.id);
    content.value = { ...response, liked: false }; // liked 속성 추가
    error.value = null; // 성공 시 에러 초기화
  } catch (error) {
    console.error('Error fetching content detail:', error);
    error.value = '컨텐츠를 불러오는 데 실패했습니다.'; // 에러 메시지 설정
    content.value = null; // 컨텐츠 초기화
  }
};
  
  const getParkImage = (imagePath) => {
    if (!imagePath) return '';
    return `http://localhost:8000/api/outdoorImages/${imagePath}`;
  };

  
  onMounted(fetchContentDetail);
  </script>
  
  <style scoped>
  .content-detail {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  
  .service-name {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }
  
  .content-wrapper {
    display: flex;
    gap: 20px;
  }
  
  .image-container {
    flex: 1;
    position: relative;
  }
  
  .image-container img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
  
  .info-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .info-item {
    display: flex;
    align-items: center;
  }
  
  .label {
    font-weight: bold;
    min-width: 80px;
  }
  
  .value {
    flex: 1;
  }
  
  .description {
    margin-top: 20px;
  }
  
  .description h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .review-section {
    margin-top: 20px;
  }
  
  .review-section textarea {
    width: 100%;
    height: 100px;
    margin-top: 10px;
  }
  
  .reservation-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    margin-top: 10px;
  }
  
  .reservation-button:hover {
    background-color: #45a049;
  }
  
  .action-buttons {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  
  .map-button,
  .like-button,
  .bookmark-button {
    margin: 5px;
    padding: 8px;
    background: #f0f0f0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  