<template>
    <div class="common-container">
      <div class="common-container-line">
        <div class="content-detail-container">
          <div class="content-detail-warpper">
            <div v-if="content" class="content-detail">
              <h2 class="service-name">{{ content.name }}</h2>
              <div class="content-wrapper">
                <div class="image-container">
                  <div class="detail-img-area">
                    <img :src="getEducationImage(content.imagePath)" :alt="content.name" v-if="content.imagePath">
                  </div>
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
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import '@/assets/css/common_container.css';
  import '@/assets/css/contents_detail.css';
  import '@/assets/css/like.css';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import api from '@/services/api';
  
  const route = useRoute();
  const content = ref(null);
  const error = ref(null);
  
  const fetchContentDetail = async () => {
    try {
      const response = await api.getEducationById(route.params.id);
      content.value = { ...response, liked: false }; // liked 속성 추가
      error.value = null; // 성공 시 에러 초기화
    } catch (error) {
      console.error('Error fetching education content detail:', error);
      error.value = '교육 프로그램 정보를 불러오는 데 실패했습니다.'; // 에러 메시지 설정
      content.value = null; // 컨텐츠 초기화
    }
  };
  
  const getEducationImage = (imagePath) => {
    if (!imagePath) return '';
    return `${api.API_URL}/educationImages/${imagePath}`;
  };
  
  onMounted(fetchContentDetail);
  </script>