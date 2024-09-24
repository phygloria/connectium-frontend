<template>
  <div class="common-container">
    <div class="common-container-line">
      <div class="content-detail-container">
        <div class="content-detail-warpper">
          <div v-if="content" class="contents-detail">
            <h2 class="service-name">{{ content.name }}</h2>
            <div class="content-wrapper">
              <div class="image-container">
                <div class="detail-img-area">
                  <img 
  :src="getParkImage(content.imagePath)" 
  :alt="content.name" 
  v-if="content.imagePath"
  class="outdoor-detail-image"
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
              <h3 class="review-write">리뷰쓰기</h3>
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';

import '@/assets/css/common_container.css';
import '@/assets/css/contents_detail.css';

const route = useRoute();
const content = ref(null);
const error = ref(null);
const isBookmarked = ref(false);

const fetchContentDetail = async () => {
  try {
    const response = await api.getParkDetail(route.params.id);
    content.value = response;
    await checkBookmarkStatus();
  } catch (err) {
    console.error('Error fetching content detail:', err);
    error.value = '컨텐츠를 불러오는 데 실패했습니다.';
  }
};

const checkBookmarkStatus = async () => {
  try {
    const bookmarks = await api.getBookmarks();
    isBookmarked.value = bookmarks.some(bookmark => 
      bookmark.itemId === content.value.id.toString() && bookmark.itemType === 'OUTDOOR'
    );
  } catch (err) {
    console.error('Error checking bookmark status:', err);
  }
};

const toggleBookmark = async () => {
  try {
    await api.toggleBookmark({
      itemId: content.value.id.toString(),
      itemType: 'OUTDOOR'
    });
    isBookmarked.value = !isBookmarked.value;
  } catch (err) {
    console.error('Error toggling bookmark:', err);
  }
};

const getParkImage = (imagePath) => {
  if (!imagePath) return '/path/to/default/image.jpg';  // 기본 이미지 경로
  const imageName = imagePath.split('/').pop(); // 파일 이름만 추출
  return api.getParkImage(imageName);
};

onMounted(fetchContentDetail);
</script>

<style scoped>
.detail-img-area {
   width: 100%;
   height: 400px;
   overflow: hidden;
   position: relative;
}

.outdoor-detail-image {
   width: 100%;
   height: 100%;
   object-fit: cover;
   transition: transform 0.3s ease;
}

.detail-img-area:hover .outdoor-detail-image {
   transform: scale(1.05);
}

@media (max-width: 768px) {
   .detail-img-area {
     height: 250px;
   }
}
</style>
