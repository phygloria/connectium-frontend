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
<<<<<<< HEAD
import { defineProps, defineEmits } from 'vue';
=======
import api from '@/services/api';
import { ref, computed, onMounted } from 'vue';
import WeatherPopup from './WeatherPopup.vue';
>>>>>>> dbbea92197900adeeb9afd1839711e8d43068d67

const props = defineProps(['weatherData']);
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
  width: 200px;
  padding: 15px;
  background-color: #f0f0f0;
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