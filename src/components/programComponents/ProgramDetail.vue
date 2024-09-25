<template>

<MainTop />

  <div class="common-container">
    <div class="common-container-line">
      <div class="content-detail-container">
        <div class="content-detail-warpper">
          <div v-if="program" class="contents-detail">
            <h2 class="service-name">{{ program.svcnm }}</h2>
            <div class="content-wrapper">
              <div class="image-container">
                <div class="detail-img-area">
    <img 
      :src="getImageUrl(program.imgurl)" 
      :alt="program.svcnm" 
      @error="handleImageError"
      ref="imageRef"
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
                  <span class="label">대상 :</span>
                  <span class="value">{{ program.usetgtinfo }}</span>
                </div>
                <div class="info-item">
    <span class="label">이용기간 :</span>
    <span class="value">{{ formatDateRange(program.svcopnbgndt, program.svcopnenddt) }}</span>
  </div>
  <div class="info-item">
    <span class="label">접수기간 :</span>
    <span class="value">{{ formatDateRange(program.rcptbgndt, program.rcptenddt) }}</span>
  </div>
                <div class="info-item">
                  <span class="label">위치 :</span>
                  <span class="value">{{ program.areanm }} {{ program.placenm }}</span>
                  <button class="direction-button">지도보기</button>
                </div>
                <div class="info-item">
                  <span class="label">가격 :</span>
                  <span class="value">{{ program.payatnm }}</span>
                </div>
                <div class="info-item">
                  <span class="label">문의처 :</span>
                  <span class="value">{{ program.telno }}</span>
                </div>
                <div class="info-item-btn">
                  <a :href="program.svcurl" target="_blank" class="reservation-button">예약하기</a>
                </div>
              </div>
            </div>
            <div class="description" v-if="program.dtlcont">
              <h3>상세 설명</h3>
              <p>{{ program.dtlcont }}</p>
            </div>
            <div class="review-section">
              <h3 class="review-write">리뷰쓰기</h3>
              <textarea placeholder="리뷰를 작성해주세요"></textarea>
            </div>
          </div>
          <div v-else-if="error" class="error-message">
            {{ error }}
          </div>
          <div v-else class="loading">Loading...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import '@/assets/css/common_container.css';
import '@/assets/css/contents_detail.css';
import MainTop from '../MainTop.vue';

import api from '@/services/api';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const program = ref(null);
const error = ref(null);
const isBookmarked = ref(false);
const imageRef = ref(null);

const fetchProgramDetail = async () => {
  try {
    const response = await api.getProgramDetail(route.params.type, route.params.svcid);
    program.value = response.data;
    await checkBookmarkStatus();
  } catch (err) {
    console.error('Error fetching program detail:', err);
    error.value = '프로그램 정보를 불러오는 데 실패했습니다.';
  }
};

const checkBookmarkStatus = async () => {
  try {
    const bookmarks = await api.getBookmarks();
    isBookmarked.value = bookmarks.some(bookmark => 
      bookmark.itemId === program.value.svcid && bookmark.itemType === route.params.type
    );
  } catch (err) {
    console.error('Error checking bookmark status:', err);
  }
};

const toggleBookmark = async () => {
  try {
    await api.toggleBookmark({
      itemId: program.value.svcid,
      itemType: route.params.type
    });
    isBookmarked.value = !isBookmarked.value;
  } catch (err) {
    console.error('Error toggling bookmark:', err);
  }
};

const getImageUrl = (filename) => {
  if (!filename) return '';
  // '/HOMEPAGE/PROGRAM/IN/' 경로가 이미 포함되어 있다면 제거
  const cleanFilename = filename.replace('/HOMEPAGE/PROGRAM/IN/', '');
  return api.getProxyImageUrl(cleanFilename);
};

const handleImageError = () => {
  if (imageRef.value) {
    imageRef.value.style.display = 'none';
    const parent = imageRef.value.parentNode;
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.textContent = '이미지를 불러올 수 없습니다';
    placeholder.style.width = '100%';
    placeholder.style.height = '200px';
    placeholder.style.backgroundColor = '#f0f0f0';
    placeholder.style.display = 'flex';
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';
    placeholder.style.color = '#666';
    placeholder.style.fontSize = '14px';
    parent.appendChild(placeholder);
  }
};

const formatDateRange = (start, end) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit'
    });
  };
  
  const startFormatted = formatDate(start);
  const endFormatted = formatDate(end);
  
  if (startFormatted && endFormatted) {
    return `${startFormatted} ~ ${endFormatted}`;
  } else if (startFormatted) {
    return `${startFormatted}부터`;
  } else if (endFormatted) {
    return `${endFormatted}까지`;
  } else {
    return '날짜 정보 없음';
  }
};

onMounted(fetchProgramDetail);

// formatDateRange 함수를 템플릿에서 사용할 수 있도록 노출
defineExpose({ formatDateRange });
</script>

<style scoped>
.img-area, .detail-img-area {
  width: 100%;
  height: 200px; /* 원하는 높이로 조정하세요 */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-area img, .detail-img-area img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지 비율을 유지하면서 영역을 채웁니다 */
}

/* ProgramDetail.vue에만 필요한 경우 */
.image-container {
  max-width: 500px; /* 원하는 최대 너비로 조정하세요 */
  margin: 0 auto;
}

/* 이미지를 불러올 수 없을 때의 대체 텍스트 스타일 */
.image-placeholder {
  width: 100%;
  height: 200px; /* img-area와 같은 높이로 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #666;
  font-size: 14px;
}
</style>