<template>
  <div class="common-container">
    <div class="common-container-line">
      <div class="content-detail-container">
        <div class="content-detail-warpper">
          <div v-if="program" class="contents-detail">
            <h2 class="service-name">{{ program.svcnm }}</h2>
            <div class="content-wrapper">
              <div class="image-container">
                <div class="detail-img-area">
                  <img :src="getImageUrl(program.imgurl)" :alt="program.svcnm" v-if="program.imgurl">
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
const program = ref(null);
const error = ref(null);
const isBookmarked = ref(false);

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
  return api.getProxyImageUrl(filename, route.params.type);
};

const formatDateRange = (start, end) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  return `${formatDate(start)} ~ ${formatDate(end)}`;
};

onMounted(fetchProgramDetail);
</script>

