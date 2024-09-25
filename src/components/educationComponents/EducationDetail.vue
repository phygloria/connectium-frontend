<template>

<MainTop/>

  <div class="common-container">
    <div class="common-container-line">
      <div class="content-detail-container">
        <div class="content-detail-warpper">
          <div v-if="content" class="content-detail">
            <h2 class="service-name">{{ content.name }}</h2>
            <div class="content-wrapper">
              <div class="image-container">
    <div class="detail-img-area">
      <img 
        :src="getEducationImage(content.imagePath)" 
        :alt="content.name" 
        v-if="content.imagePath"
        class="education-detail-image"
      >
    </div>
                <div class="action-buttons">
                  <button class="map-button">지도보기</button>
                  <button class="bookmark-button" @click="toggleBookmark">
                    {{ isBookmarked ? '🔖' : '☆' }}
                  </button>
                </div>
              </div>
              <div class="info-container">
                <div class="info-item">
                  <span class="label">접수기간 :</span>
                  <span class="value">{{ content.registrationPeriod }}</span>
                </div>
                <div class="info-item">
                  <span class="label">대상 :</span>
                  <span class="value">{{ content.targetAudience }}</span>
                </div>
                <div class="info-item">
                  <span class="label">장소 :</span>
                  <span class="value">{{ content.location }}</span>
                </div>
                <div class="info-item">
                  <span class="label">비용 :</span>
                  <span class="value">{{ content.cost || '무료' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">교육기간 :</span>
                  <span class="value">{{ content.educationPeriod }}</span>
                </div>
                <div class="info-item">
                  <span class="label">문의처 :</span>
                  <span class="value">{{ content.phoneNumber }}</span>
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
import MainTop from '../MainTop.vue';

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';


const route = useRoute();
const content = ref(null);
const error = ref(null);
const isBookmarked = ref(false);

const fetchContentDetail = async () => {
  try {
    const response = await api.getEducationById(route.params.id);
    content.value = response;
    await checkBookmarkStatus();
  } catch (err) {
    console.error('Error fetching education content detail:', err);
    error.value = '교육 프로그램 정보를 불러오는 데 실패했습니다.';
  }
};

const checkBookmarkStatus = async () => {
  try {
    const bookmarks = await api.getBookmarks();
    isBookmarked.value = bookmarks.some(bookmark => 
      bookmark.itemId === content.value.id.toString() && bookmark.itemType === 'EDUCATION'
    );
  } catch (err) {
    console.error('Error checking bookmark status:', err);
  }
};

const toggleBookmark = async () => {
  try {
    await api.toggleBookmark({
      itemId: content.value.id.toString(),
      itemType: 'EDUCATION'
    });
    isBookmarked.value = !isBookmarked.value;
  } catch (err) {
    console.error('Error toggling bookmark:', err);
  }
};

const getEducationImage = (imagePath) => {
  if (!imagePath) return '/path/to/default/image.jpg';  // 기본 이미지 경로
  const imageName = imagePath.split('/').pop(); // 파일 이름만 추출
  return api.getEducationImageUrl(imageName);
};

onMounted(fetchContentDetail);
</script>

<style scoped>


.detail-img-area {
  width: 100%;
  height: 400px; /* 원하는 높이로 조정하세요 */
  overflow: hidden;
  position: relative;
  border-radius: 8px; /* 이미지 모서리를 둥글게 만듭니다 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 이미지에 그림자 효과를 줍니다 */
}

.education-detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.detail-img-area:hover .education-detail-image {
  transform: scale(1.05);
}

/* 반응형 디자인을 위한 미디어 쿼리 */
@media (max-width: 768px) {
  .detail-img-area {
    height: 250px; /* 모바일 화면에서는 더 작게 */
  }
}
</style>

