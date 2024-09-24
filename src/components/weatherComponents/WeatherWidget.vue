<template>
  <div class="weather-widget" @click="togglePopup">
    <div v-if="currentWeather">
      <h5>{{ location }}</h5>
      <div class="weather-info">
        <span class="weather-emoji">{{ getWeatherEmoji(currentWeather.skyCondition) }}</span>
        <span class="temperature">{{ currentWeather.temperature }}°C</span>
        <span class="condition">{{ currentWeather.skyCondition }}</span>
      </div>
    </div>
    <p v-if="error">{{ error }}</p>
    <WeatherPopup v-if="showPopup" 
                  :currentWeather="currentWeather" 
                  :hourlyForecasts="hourlyForecasts" 
                  @close="showPopup = false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/services/api';
import WeatherPopup from './WeatherPopup.vue';

const weatherData = ref(null); // 날씨 데이터를 저장
const location = ref("중랑구"); // 사용자의 위치를 저장
const error = ref(null); // API 호출 시 발생한 에러 메시지를 저장
const showPopup = ref(false); // 팝업의 표시 여부를 제어

const currentWeather = computed(() => weatherData.value?.currentWeather);
const hourlyForecasts = computed(() => weatherData.value?.shortTermForecasts || []);

const getWeather = async (latitude = null, longitude = null) => {
  try {
    const response = await api.getWeather(latitude, longitude);
    weatherData.value = response.data;
    if (latitude === null && longitude === null) {
      location.value = "중랑구 (기본 위치)";
    }
  } catch (err) {
    console.error("Weather API error:", err);
    error.value = `날씨 정보를 가져오는데 실패했습니다: ${err.message}`;
  }
};

const togglePopup = () => {
  showPopup.value = !showPopup.value;
};
// togglePopup 함수는 showPopup 값을 반전시켜 팝업을 열거나 닫음

// 날씨 상태에 따른 이모티콘 반환
const getWeatherEmoji = (condition) => {
  switch (condition) {
    case "맑음": return "☀️";
    case "구름많음": return "⛅";
    case "흐림": return "☁️";
    case "비": return "🌧️";
    case "눈": return "❄️";
    default: return "🌈";
  }
};

// 컴포넌트 마운트 시 날씨 정보 가져오기
onMounted(getWeather);
</script>

<style scoped>
.weather-widget {
  position: absolute;
  top: 20px; /* 상단에서 20px */
  right: 10px; /* 우측에서 20px */
  width: 180px;
  height: 130px;
  /* z-index: 1000; 다른 요소들 위에 표시되도록 */
}
.weather-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.weather-emoji {
  font-size: 36px;
}
.temperature {
  font-size: 24px;
  font-weight: bold;
}
.condition {
  font-size: 14px;
}
</style>