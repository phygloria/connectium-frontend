<!-- WeatherPopup.vue -->
<template>
    <div v-if="show" class="weather-popup">
      <div class="popup-content">
        <h2>상세 날씨 정보</h2>
        <p>현재 기온: {{ weatherData.TMP }}°C</p>
        <p>강수 확률: {{ weatherData.POP }}%</p>
        <p>하늘 상태: {{ getSkyCondition(weatherData.SKY) }}</p>
        <p>풍속: {{ weatherData.WSD }} m/s</p>
        <p>습도: {{ weatherData.REH }}%</p>
        <button @click="$emit('close')">닫기</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps(['show', 'weatherData']);
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
  .weather-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
  }
  </style>