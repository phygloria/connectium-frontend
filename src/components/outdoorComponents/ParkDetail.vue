<template>

  <MainTop />

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
                  >
                </div>
              </div>
              <div class="info-container">
                <div class="action-buttons">
                  <!-- <button class="map-button">지도보기</button> -->
                  <button class="bookmark-button" @click="toggleBookmark">
                    <img :src="isBookmarked ? bookmarkIcon : starIcon" :alt="isBookmarked ? '북마크 제거' : '북마크 추가'"
                      :class="isBookmarked ? 'bookmark-icon' : 'star-icon'" />
                  </button>
                </div>
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

            <ReviewSection 
              :itemId="content.id.toString()"
              itemType="OUTDOOR"
            />
          </div>
          <div v-else-if="error" class="error-message">
            {{ error }}
          </div>
          <div v-else>Loading...</div>
        </div>
      </div>
      <div class="background-image"></div>
    </div>
  </div>
</template>

<script setup>
import '@/assets/css/common_container.css';
import '@/assets/css/contents_detail.css';
import MainTop from '@/components/MainTop.vue';
import ReviewSection from '@/components/ReviewSection.vue';

import api from '@/services/api';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

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

.outdoor-detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.detail-img-area:hover .outdoor-detail-image {
  transform: scale(1.05);
}


.review-section {
  margin-top: 30px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.review-title {
  font-size: 1.5em;
  color: #343a40;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e9ecef;
}

.reviews-list {
  margin-bottom: 30px;
}

.review-item {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
  transition: box-shadow 0.3s ease;
}

.review-item:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.review-author {
  font-weight: bold;
  color: #495057;
}

.review-date {
  font-size: 0.9em;
  color: #6c757d;
}

.review-content {
  color: #212529;
  line-height: 1.6;
}

.no-reviews {
  color: #6c757d;
  font-style: italic;
  text-align: center;
  padding: 20px 0;
}

.review-form {
  margin-top: 20px;
}

.review-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.review-textarea:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
}

.submit-review-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-review-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.submit-review-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}



</style>