<template>
    <div class="weather-widget">
      <h5>{{ location }} 날씨</h5>
      <div v-if="weatherData">
        <p>기온: {{ weatherData.temperature }}°C</p>
        <p>날씨 상태: {{ weatherData.condition }}</p>
      </div>
      <p v-if="error">{{ error }}</p>
      <WeatherPopup v-if="showPopup" :weatherData="weatherData" @close="showPopup = false" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import api from '@/services/api';
  import WeatherPopup from '../components/WeatherPopup.vue';
  
  // 반응형 상태 선언
  const weatherData = ref(null);
  const location = ref("중랑구");
  const error = ref(null);
  const showPopup = ref(false);
  
  // 날씨 데이터를 가져오는 함수
  const getWeather = async (latitude = null, longitude = null) => {
    try {
      weatherData.value = await api.getWeather(latitude, longitude);
      if (latitude === null && longitude === null) {
        location.value = "중랑구 (기본 위치)";
      }
    } catch (err) {
      error.value = `날씨 정보를 가져오는데 실패했습니다: ${err.message}`;
    }
  };
  
  // 사용자 위치를 가져오고 날씨 데이터를 요청하는 함수
  const getLocationAndWeather = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeather(latitude, longitude);
          location.value = "현재 위치";
        },
        (err) => {
          console.error("위치 정보를 가져오는데 실패했습니다:", err);
          getWeather(); // 기본 위치(중랑구) 사용
        }
      );
    } else {
      getWeather(); // 기본 위치(중랑구) 사용
    }
  };
  
  // 컴포넌트가 마운트될 때 실행
  onMounted(getLocationAndWeather);
  </script>
  
  <style scoped>
  .weather-widget {
    padding: 20px;
    border-radius: 8px;
    max-width: 300px;
    margin: 0 auto;
  }
  </style>