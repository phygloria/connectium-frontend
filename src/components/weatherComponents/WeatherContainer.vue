<!-- WeatherContainer.vue -->
<template>
    <div>
      <WeatherWidget 
        :weatherData="weatherData" 
        @showPopup="showPopup = true" 
      />
      <WeatherPopup 
        :show="showPopup" 
        :weatherData="weatherData" 
        @close="showPopup = false" 
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import WeatherWidget from './WeatherWidget.vue';
  import WeatherPopup from './WeatherPopup.vue';
  
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const apiUrl = import.meta.env.VITE_WEATHER_API_URL;
  
  const weatherData = ref(null);
  const showPopup = ref(false);
  
  const fetchWeatherData = async () => {
    const now = new Date();
    const baseDate = now.toISOString().slice(0, 10).replace(/-/g, '');
    const baseTime = now.getHours().toString().padStart(2, '0') + '00';
  
    const url = `${apiUrl}/getUltraSrtFcst?serviceKey=${apiKey}&dataType=JSON&numOfRows=60&pageNo=1&base_date=${baseDate}&base_time=${baseTime}&nx=62&ny=128`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.response.header.resultCode === '00') {
        const items = data.response.body.items.item;
        weatherData.value = processWeatherData(items);
      } else {
        console.error('API 오류:', data.response.header.resultMsg);
      }
    } catch (error) {
      console.error('날씨 데이터 요청 실패:', error);
    }
  };
  
  const processWeatherData = (items) => {
    const result = {};
    items.forEach(item => {
      result[item.category] = item.fcstValue;
    });
    return result;
  };
  
  onMounted(fetchWeatherData);
  </script>