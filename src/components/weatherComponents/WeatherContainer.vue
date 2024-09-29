<!-- WeatherContainer.vue -->
<template>
  <div>
    <div v-if="loading">날씨 정보를 불러오는 중...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <WeatherWidget 
      v-else-if="weatherData" 
      :weatherData="weatherData" 
      @showPopup="showPopup = true" 
    />
    <WeatherPopup 
      v-if="showPopup" 
      :weatherData="weatherData" 
      @close="showPopup = false" 
    />
  </div>    
</template>

<script setup>
import { ref, onMounted } from 'vue';
import WeatherWidget from '@/components/weatherComponents/WeatherWidget.vue';
import WeatherPopup from '@/components/weatherComponents/WeatherPopup.vue';

const apiKey = process.env.VUE_APP_WEATHER_API_KEY;
const apiUrl = process.env.VUE_APP_WEATHER_API_URL;

const weatherData = ref(null);
const error = ref(null);
const loading = ref(true);
const showPopup = ref(false);

const fetchWeatherData = async () => {
  if (!apiKey || !apiUrl) {
    error.value = "날씨 정보를 불러올 수 없습니다. 관리자에게 문의해 주세요.";
    loading.value = false;
    return;
  }

  const now = new Date();
  const baseDate = now.toISOString().slice(0, 10).replace(/-/g, '');
  const baseTime = now.getHours().toString().padStart(2, '0') + '00';

  const url = `${apiUrl}/getUltraSrtFcst?serviceKey=${encodeURIComponent(apiKey)}&dataType=JSON&numOfRows=60&pageNo=1&base_date=${baseDate}&base_time=${baseTime}&nx=62&ny=128`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    console.log('API Response:', text); // 디버깅을 위해 응답 로깅

    if (text.trim().startsWith('<?xml')) {
      throw new Error('API returned XML instead of JSON');
    }

    const data = JSON.parse(text);

    if (data.response && data.response.header && data.response.header.resultCode === '00') {
      const items = data.response.body.items.item;
      weatherData.value = processWeatherData(items);
    } else {
      throw new Error(data.response?.header?.resultMsg || 'Unknown API Error');
    }
  } catch (err) {
    console.error('날씨 데이터 요청 실패:', err);
    error.value = "날씨가 부끄러워 숨었어요. 잠시 후 다시 불러주세요.";
  } finally {
    loading.value = false;
  }
};

const processWeatherData = (items) => {
  const result = {};
  items.forEach(item => {
    result[item.category] = item.fcstValue;
  });
  console.log('Processed Weather Data:', result); // 처리된 데이터 로깅
  return result;
};

onMounted(fetchWeatherData);
</script>



<style scoped>
.error-message {
  color: #c9e0ff;
  padding: 10px;
  border: 1px solid #c9e0ff;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>