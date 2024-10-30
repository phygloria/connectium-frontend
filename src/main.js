import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/font.css'

// 앱 인스턴스 생성
const app = createApp(App)

// Pinia 스토어 생성
const pinia = createPinia()

// 플러그인 등록
app.use(pinia)   // 상태 관리
app.use(router)  // 라우팅

// 앱 마운트
app.mount('#app')

// 개발 환경에서 디버깅을 위한 전역 앱 인스턴스 노출
if (import.meta.env.DEV) {
  window.app = app
}