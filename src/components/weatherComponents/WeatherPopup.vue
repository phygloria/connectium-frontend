<template>
  <div class="weather-popup">
    <h2>{{ props.location }} 날씨</h2>
    <div v-if="props.currentWeather" class="current-weather">
      <h3>현재 날씨</h3>
      <span class="weather-emoji">{{ getWeatherEmoji(props.currentWeather.skyCondition) }}</span>
      <p>기온: {{ props.currentWeather.temperature }}°C</p>
      <p>날씨: {{ props.currentWeather.skyCondition }}</p>
      <p>습도: {{ props.currentWeather.humidity }}%</p>
      <p>강수량: {{ props.currentWeather.hourlyRainfall }}mm</p>
      <p>풍속: {{ props.currentWeather.windSpeed }} m/s</p>
      <p>풍향: {{ props.currentWeather.windDirection }}</p>
    </div>
    <div class="hourly-forecast">
      <h3>시간별 예보</h3>
      <div v-for="forecast in props.hourlyForecasts" :key="forecast.forecastDate + forecast.forecastTime" class="forecast-item">
        <p>{{ formatDateTime(forecast.forecastDate, forecast.forecastTime) }}</p>
        <span class="weather-emoji-small">{{ getWeatherEmoji(forecast.skyCondition) }}</span>
        <p>{{ forecast.temperature }}°C</p>
        <p>{{ forecast.skyCondition }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['currentWeather', 'hourlyForecasts', 'location']);

const formatDateTime = (date, time) => {
  return `${date.substring(4, 6)}/${date.substring(6, 8)} ${time.substring(0, 2)}:${time.substring(2, 4)}`;
};

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
</script>

<style scoped>
.weather-popup {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  margin: auto;
}
.weather-emoji {
  font-size: 48px;
}
.weather-emoji-small {
  font-size: 24px;
}
.forecast-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.current-weather, .hourly-forecast {
  margin-bottom: 20px;
}
</style>