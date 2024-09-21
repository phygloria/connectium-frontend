<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-4/5 max-w-4xl">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">광진구 군자동 상세 날씨</h2>
          <button @click="onClose" class="text-2xl">&times;</button>
        </div>
  
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">현재 날씨</h3>
          <div class="flex items-center">
            <div class="text-6xl mr-4">{{ weatherData.temperature || 'N/A' }}°</div>
            <div>
              <p>{{ weatherData.condition || '정보 없음' }}</p>
              <p>습도: {{ weatherData.humidity || 'N/A' }}%</p>
              <p>바람: {{ weatherData.windSpeed || 'N/A' }} m/s</p>
            </div>
          </div>
        </div>
  
        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-2">시간별 예보</h3>
          <LineChart width="700" height="200" :data="hourlyForecast">
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#8884d8" />
          </LineChart>
        </div>
  
        <div>
          <h3 class="text-xl font-semibold mb-2">주간 예보</h3>
          <div class="grid grid-cols-7 gap-4">
            <div v-for="day in weeklyForecast" :key="day.day" class="text-center">
              <p>{{ day.day }}</p>
              <p class="text-2xl">{{ day.icon }}</p>
              <p>{{ day.minTemp }}° / {{ day.maxTemp }}°</p>
              <p>{{ day.rainProb }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import { LineChart, XAxis, YAxis, Tooltip, Line } from 'recharts';
  
  const props = defineProps({
    weatherData: {
      type: Object,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
  });
  
  const hourlyForecast = props.weatherData.hourly || [];
  const weeklyForecast = props.weatherData.weekly || [];
  </script>
  
  <style scoped>
  /* 스타일 추가 */
  </style>
  