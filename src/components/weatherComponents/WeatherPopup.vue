<!-- WeatherPopup.vue -->
<template>
  <div class="weather-popup-overlay">
    <div class="weather-popup">
      <div class="popup-content">
        <h2>상세 날씨 정보</h2>
        <div v-if="weatherData">
          <p>현재 기온: {{ weatherData.T1H || 'N/A' }}°C</p>
          <p>강수 확률: {{ weatherData.POP || 'N/A' }}%</p>
          <p>하늘 상태: {{ getSkyCondition(weatherData.SKY) }}</p>
          <p>풍속: {{ weatherData.WSD || 'N/A' }} m/s</p>
          <p>습도: {{ weatherData.REH || 'N/A' }}%</p>
        </div>
        <div v-else>
          날씨 정보를 불러오는 중...
        </div>
        <button @click="$emit('close')" class="close-button">닫기</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps(['weatherData']);
defineEmits(['close']);

const getSkyCondition = (skyCode) => {
  switch (skyCode) {
    case '1': return '맑음';
    case '3': return '구름많음';
    case '4': return '흐림';
    default: return '알 수 없음';
  }
};
</script>


<style scoped>
.weather-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 매우 높은 z-index 값 */
}

.weather-popup {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
}

.popup-content {
  position: relative;
}

.close-button {
  position: relative;

  padding: 5px 10px;
  background-color: #a9da49;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

p {
  margin-bottom: 10px;
}
</style>