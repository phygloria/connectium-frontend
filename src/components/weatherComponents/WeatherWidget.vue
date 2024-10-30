<!-- WeatherWidget.vue -->
<template>
  <div v-if="weatherData" class="weather-widget" @click="$emit('showPopup')">
    <div class="widget-content">
      <div class="temperature">{{ weatherData.T1H }}°C</div>
      <div class="sky-condition">{{ getSkyCondition(weatherData.SKY) }}</div>
      <div class="temperature-range">
        {{ weatherData.TMN }}°C / {{ weatherData.TMX }}°C
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

defineProps(['weatherData']);
defineEmits(['showPopup']);

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
.weather-widget {
  width: 100px;
  padding: 15px;
  color: black;
  background-color: rgba(255, 255, 255, 0.5); /* 마지막 값이 투명도 (0~1) */
  border-radius: 10px;
  cursor: pointer;
}

.widget-content {
  text-align: center;
}

.temperature {
  font-size: 24px;
  font-weight: bold;
}

.sky-condition, .temperature-range {
  margin-top: 5px;
}
</style>