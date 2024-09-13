<template>
  <div v-if="program" class="program-detail">
    <h2 class="service-name">{{ program.svcnm }}</h2>
    <div class="content-wrapper">
      <div class="image-container">
        <img :src="getImageUrl(program.imgurl)" :alt="program.svcnm" v-if="program.imgurl">
        <div class="action-buttons">
          <button class="map-button">지도보기</button>
          <button class="like-button">♡</button>
          <button class="bookmark-button">🔖</button>
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
        <div class="info-item">
          <a :href="program.svcurl" target="_blank" class="reservation-button">예약하기</a>
        </div>
      </div>
    </div>
    <div class="description" v-if="program.dtlcont">
      <h3>상세 설명</h3>
      <p>{{ program.dtlcont }}</p>
    </div>
    <div class="review-section">
      <h3>리뷰쓰기</h3>
      <textarea placeholder="리뷰를 작성해주세요"></textarea>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';

const route = useRoute();
const program = ref(null);

const fetchProgramDetail = async () => {
  try {
    const response = await api.getProgramDetail(route.params.type, route.params.svcid);
    program.value = response.data;
  } catch (error) {
    console.error('Error fetching program detail:', error);
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
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  };
  return `${formatDate(start)} ~ ${formatDate(end)}`;
};

onMounted(fetchProgramDetail);
</script>

<style scoped>
.program-detail {
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
