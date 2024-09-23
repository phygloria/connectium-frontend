<template>
  <div class="common-container">
    <div class="common-container-line">
      <div class="content-list-container">
        <div class="content-list-warpper">
          <div class="title-container">
            <div class="title-bar">
              <h1 class="title">가을하늘에는 파란하늘을 보며!</h1>
              <h5 class="sub-title">중랑구 가을나들이 가기 좋은 곳</h5>
              <div class="filter-bar">
                <div class="filters">
                  <button v-for="filter in filters" :key="filter.value" @click="activeFilter = filter.value" :class="{
                    active: activeFilter === filter.value,
                    'education-program': filter.label === '교육프로그램'
                  }">
                    {{ filter.label }}
                  </button>
                </div>
              </div>

              <div v-if="isLoading" class="loading">
                <h5>데이터를 불러오는 중...</h5>
              </div>

              <div v-else-if="error" class="error">{{ error }}</div>

              <!-- 테스트 --> 
              <div>
                <!-- 이미지가 로딩 중일 때 표시할 로딩 메시지 -->
                <div v-if="loading">Loading image...</div>

                <!-- 이미지가 로딩된 후 표시 -->
                <img v-else :src="imageUrl" alt="Program Image" />
              </div>
              <!-- 테스트 -->

              <div class="list-container">
                <div class="list-column">
                  <div class="list-in-column">
                    <div class="list-card" v-for="content in filteredEvents" :key="content.id"
                      @click="navigateToDetail(content)">
                      <div class="img-area">
                        <img :src="getImageUrl(content.imageUrl)" :alt="content.title || content.svcnm" />
                      </div>
                      <div class="content-info-box">
                        <div class="content-info-area">
                          <div class="content-info">
                            <h3 class="content-title">{{ content.title || content.svcnm }}</h3>
                            <p class="content-location">{{ content.location || content.placenm }}</p>
                            <p class="content-date">{{ formatDate(content.date || content.svcopnbgndt) }}</p>
                            <div class="content-status">
                              <span :class="['status', content.status || content.svcstatnm]">
                                {{ content.status || content.svcstatnm }}
                              </span>
                            </div>
                          </div>
                          <!-- <div class="like-area">
                            <button class="like-button" @click="toggleLike(content.id)">
                              <img
                                :src="content.liked ? require('@/assets/images/icon/heart_icon_in_pink.png') : require('@/assets/images/icon/flat_heart_shape.png')"
                                :alt="content.liked ? '좋아요 취소' : '좋아요'" class="heart-icon">
                            </button>
                          </div> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import '@/assets/css/common_container.css';
import '@/assets/css/contents_list.css';
// import '@/assets/css/like.css';///
import { ref, reactive, computed, onMounted } from 'vue';
import { useAllPrograms } from '@/composables/useAllPrograms';
import { useRouter } from 'vue-router';

import api from '@/services/api';  // API 파일을 import

const imageUrl = ref('');  // 이미지 URL을 저장할 reactive 변수
const loading = ref(true);  // 로딩 상태를 나타내는 변수

// onMounted 훅을 사용하여 컴포넌트가 마운트된 후 API 호출

onMounted(async () => {
  try {

    // 이미지 URL 생성
    const filename = 'event_S240408183329155486.jpg';
    imageUrl.value = api.getProxyImageUrl(filename);
  } catch (error) {
    console.error('Error fetching image URL:', error);
  } finally {
    loading.value = false;  // 로딩 완료
  }
});

// // like 고유 ID 생성을 위한 함수
// let nextId = 1;
// function generateUniqueId() {
//   return nextId++;
// }

// 컴포저블과 라우터 설정

const router = useRouter();

const { programs, isLoading, error, fetchPrograms } = useAllPrograms();


// 반응형 상태 설정

const activeFilter = ref('all');


// 필터 설정 (변경되지 않는 값이므로 reactive 불필요)

const filters = reactive([
  { value: 'all', label: '전체보기' },
  { value: 'culture', label: '문화행사' },
  { value: 'free', label: '무료' },
  { value: 'paid', label: '유료' }
]);


// 필터 함수 정의

const filterFunctions = {
  all: () => true,
  culture: content => content.type === 'program1',
  free: content => content.payatnm === '무료',
  paid: content => content.payatnm === '유료'
};



// 계산된 속성
// computed 속성
const filteredEvents = computed(() => {
  if (!programs.value) return [];
  const filterFn = filterFunctions[activeFilter.value] || filterFunctions['all'];
  return programs.value.filter(filterFn);
});




// // like 메서드 정의

// const toggleLike = (eventId) => {
//   const index = programs.value.findIndex(e => e.id === eventId);
//   if (index !== -1) {
//     const updatedProgram = { ...programs.value[index], liked: !programs.value[index].liked };
//     programs.value[index] = updatedProgram;
//   }
// };


const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch (error) {
    console.error('Invalid date:', dateString);
    return dateString; // 또는 기본 날짜 반환
  }
};

// const socket = ref(null);
// const messages = ref([]);

// const connectWebSocket = () => {
//   const wsUrl = process.env.VUE_APP_WS_URL || 'ws://localhost:8080/ws';
//   socket.value = new WebSocket(wsUrl);

//   socket.value.onopen = () => {
//     console.log('WebSocket 연결 성공');
//   };

//   socket.value.onmessage = (event) => {
//     const data = JSON.parse(event.data);
//     messages.value.push(data);
//     console.log('받은 메시지:', data);
//   };

//   socket.value.onclose = (event) => {
//     console.log('WebSocket 연결 종료:', event.reason);
//     setTimeout(connectWebSocket, 5000); // 5초 후 재연결 시도
//   };

//   socket.value.onerror = (error) => {
//     console.error('WebSocket 오류:', error);
//   };

//   const sendMessage = (type, content) => {
//     if (socket.value && socket.value.readyState === WebSocket.OPEN) {
//       const message = JSON.stringify({ type, content });
//       socket.value.send(message);
//     } else {
//       console.error('WebSocket이 연결되지 않았습니다.');
//     }
//   };

//   onMounted(() => {
//     connectWebSocket();
//   });

//   onUnmounted(() => {
//     if (socket.value) {
//       socket.value.close();
//     }
//   });

//   // 메시지 전송 예시
//   const sendChatMessage = () => {
//     sendMessage('chat', '안녕하세요!');
//   };

//   const requestUpdate = () => {
//     sendMessage('update', '데이터 업데이트 요청');
//   };
// };


const getImageUrl = (url) => {
  if (!url) return '';
  return `/api/programs/proxy-image?filename=${encodeURIComponent(url)}`;
};

const navigateToDetail = (content) => {
  router.push({
    name: 'programDetail',
    params: {
      type: content.type === 'program1' ? 'CulProgram' : 'EduProgram',
      svcid: content.svcid
    }
  });
};

// 라이프사이클 훅

onMounted(async () => {
  await fetchPrograms();

  // // 초기 데이터를 reactive 배열로 복사하면서 like 고유 ID 할당
  // if (initialPrograms.value) {
  //   programs.value.push(...initialPrograms.value.map(content => ({
  //     ...content,
  //     id: generateUniqueId(),
  //     liked: false // 초기 좋아요 상태 설정
  //   })));
  // }
});



</script>


<style scoped></style>