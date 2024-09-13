<!-- body 기본 셋팅 -->
<template>
  <div class="common-container">
    <div class="common-containerLine">
      <div class="title-container">
        <div class="title-bar">
          <h1 class="title">가을하늘에는 파란하늘을 보며!</h1>
          <h5 class="sub-title">중랑구 가을나들이 가기 좋은 곳</h5>
          <div class="filter-bar">
            <div class="filters">
              <button v-for="filter in filters" :key="filter.value" @click="activeFilter = filter.value"
                :class="{ active: activeFilter === filter.value, 
                          'education-program': filter.label === '교육프로그램' }">
                {{ filter.label }}
              </button>
            </div>
          </div>

          <div v-if="isLoading" class="loading">
            <h5>데이터를 불러오는 중...</h5>
          </div>
    
          <div v-else-if="error" class="error">{{ error }}</div>

          <div class="list-container">
            <div class="list-column">
              <div class="events-column">
                <div class="event-card" v-for="event in filteredEvents" :key="event.id" @click="navigateToDetail(event)">
                  <div class="img-area">
                    <img :src="getImageUrl(event.imageUrl)" :alt="event.title || event.svcnm" />
                  </div>
                  <div class="event-info-box">
                    <div class="event-info-area">
                      <div class="event-info">
                        <h3 class="event-title">{{ event.title || event.svcnm }}</h3>
                        <p class="event-location">{{ event.location || event.placenm }}</p>
                        <p class="event-date">{{ formatDate(event.date || event.svcopnbgndt) }}</p>
                        <div class="event-status">
                          <span :class="['status', event.status || event.svcstatnm]">
                            {{ event.status || event.svcstatnm }}
                          </span>
                        </div>
                      </div>
                      <div class="like-area">
                        <button class="like-button" @click="toggleLike(event.id)">
                          <img 
                            :src="event.liked ? require('@/assets/images/icon/heart_icon_in_pink.png') : require('@/assets/images/icon/flat_heart_shape.png')"
                            :alt="event.liked ? '좋아요 취소' : '좋아요'"
                            class="heart-icon"
                          >                          
                          <!-- {{ event.liked ? '♥' : '♡' }} -->
                        </button>
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
import { ref, reactive, computed, onMounted } from 'vue';
import { useAllPrograms } from '@/composables/useAllPrograms';
import { useRouter } from 'vue-router';

// 고유 ID 생성을 위한 함수
let nextId = 1;
function generateUniqueId() {
  return nextId++;
}

const router = useRouter();

const { programs: initialPrograms, isLoading, error, fetchPrograms } = useAllPrograms();

// programs를 reactive로 변경
const programs = reactive([]);

const activeFilter = ref('all');

const filters = [
  { value: 'all', label: '전체보기' },
  { value: 'culture', label: '문화행사' },
  { value: 'education', label: '교육프로그램' },
  { value: 'free', label: '무료' },
  { value: 'paid', label: '유료' }
];

const filterFunctions = {
  all: () => true,
  culture: event => event.type === 'program1',
  education: event => event.type === 'program2',
  free: event => event.payatnm === '무료',
  paid: event => event.payatnm === '유료'
};

// const filteredEvents = computed(() => 
//   programs.value.filter(filterFunctions[activeFilter.value])
// );

const filteredEvents = computed(() => 
  programs.filter(filterFunctions[activeFilter.value])
);


// const toggleLike = (event) => {
//   // Vue의 반응성 시스템을 활용하여 업데이트
//   const index = programs.value.findIndex(e => e.id === event.id);
//   if (index !== -1) {
//     programs.value[index] = { ...programs.value[index], liked: !programs.value[index].liked };
//   }
// };
const toggleLike = (eventId) => {
  const event = programs.find(e => e.id === eventId);
  if (event) {
    event.liked = !event.liked;
  }
};



const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
};

const getImageUrl = (url) => {
  if (!url) return '';
  return `/api/programs/proxy-image?filename=${encodeURIComponent(url)}`;
};

onMounted(async () => {
  await fetchPrograms();

  // 초기 데이터를 reactive 배열로 복사하면서 고유 ID 할당
  programs.push(...initialPrograms.value.map(event => ({
    ...event,
    id: generateUniqueId(),
    liked: false // 초기 좋아요 상태 설정
  })));
});

const navigateToDetail = (event) => {
  router.push({ 
    name: 'programDetail', 
    params: { 
      type: event.type === 'program1' ? 'CulProgram' : 'EduProgram', 
      svcid: event.svcid 
    } 
  });
};

</script>


<style scoped>
.common-container {
  padding: 20px 30px 20px 30px;
}

.common-containerLine {
  width: 100%;
  box-shadow: 0px 3px 7px #DBFA5F;
  border-radius: 50px;
  border: 2px #8CD000 solid;
  height: auto;
  min-height: 330px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.title {
  color: black;
  font-size: 50px;
  font-family: MangoByeolbyeol;
  font-weight: 400;
  word-wrap: break-word
}

.sub-title {
  color: #1E1E1E;
  font-size: 30px;
  font-family: Ownglyph meetme;
  font-weight: 400;
  word-wrap: break-word
}

.all-programs {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
  color: black;
  font-size: 25px;
  font-family: Pretendard;
  font-weight: 400;
  word-wrap: break-word
}

/* 버튼 비활성화 상태 */
.filters button {
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #ffffff;
  cursor: pointer;
  width: 120px; height: 100%; border-radius: 20px; border: 2px #C0EA6A solid;
}

/* 비활성화 | '교육프로그램' 글자수 가로길이 조정 */
.filters button.education-program {
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #ffffff;
  cursor: pointer;
  width: 170px; height: 100%; border-radius: 20px; border: 2px #C0EA6A solid;
}

/* 버튼 활성화 상태 */
.filters button.active {
  background-color: #8FD600;
  color: white;
  width: 120px; height: 100%; border-radius: 20px; border: 2px #C0EA6A solid;
}

/* 활성화 | '교육프로그램' 글자수 가로길이 조정 */
.filters button.active.education-program {
  background-color: #8FD600;
  color: white;
  width: 170px; height: 100%; border-radius: 20px; border: 2px #C0EA6A solid;
}


.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2em;
  color: #5498ff;
}

.error {
  color: rgb(105, 24, 24);
  text-align: center;
  padding: 20px;
}



.events-column {
  display: grid;
  grid-template-columns: repeat(2, 1fr);  /* 2개의 열로 변경 */
  /* grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); */
  gap: 20px;
  max-width: 1040px;  /* 두 카드의 너비(500px * 2) + 간격(20px) */
  margin: 0 auto;  /* 중앙 정렬 */
}

.event-card {
  display: flex;
  padding: 3%;
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
  width: 500px;
  height: 100%;
  background: white; 
  box-shadow: 0px 4px 8px 3px rgba(136.62, 202.94, 0.85, 0.30);
}

@media (max-width: 1040px) {
  .events-column {
    grid-template-columns: 1fr;  /* 화면이 좁아지면 한 열로 변경 */
    max-width: 520px;  /* 한 카드의 너비 + 패딩 */
  }
}

.img-area {
  flex: 0 30 220px; /* 이미지 영역의 크기를 고정 */
  height: 120px; background: #e2e2e2; border-radius: 10px;
  left: -70px; top: -25px;
  margin-right: 20px; /* 이미지와 텍스트 사이의 간격 */
}

.event-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-info-box {
  flex: 1; /* 남은 공간을 모두 차지하도록 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 중앙 정렬 */
}

.event-info {
  padding: 10px;
}

.event-title {
  color: #1E1E1E;
  font-size: 20px; /* 글자 크기를 조금 줄임 */
  font-family: Pretendard-Bold;
  font-weight: 600;
  word-wrap: break-word;
  margin-bottom: 5px; /* 제목 아래 여백 추가 */
    /* 추가 및 수정된 속성 */
  word-break: keep-all; /* 단어 단위로 줄바꿈 */
  overflow-wrap: break-word; /* 긴 단어의 경우 줄바꿈 */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 2줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* 넘치는 텍스트에 대해 말줄임표 표시 */
  max-height: 2.4em; /* 대략 2줄의 높이 */
  line-height: 1.2; /* 줄 간격 설정 */
}

.event-location, .event-date {
  color: #1E1E1E;
  font-size: 14px; /* 글자 크기를 조금 줄임 */
  font-family: Pretendard-Regular;
  font-weight: 400;
  line-height: 1.2; /* 줄 간격 조정 */
  word-wrap: break-word;
  margin-bottom: 3px; /* 각 항목 사이 여백 추가 */
}

.status {
  position: static; /* 절대 위치에서 일반 위치로 변경 */
  display: inline-block; /* 인라인 블록으로 변경 */
  padding: 3px 5px;
  border-radius: 10px;
  font-size: 12px;
  margin-top: 5px; /* 상태 위 여백 추가 */
}

.status.접수중 {
  background-color: #4CAF50;
  color: white;
}

.status.접수종료 {
  background-color: #f44336;
  color: white;
}


.like-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 23px;  /* 원하는 크기로 조정 */
  height: 20px; /* 원하는 크기로 조정 */
}

.heart-icon {
  transition: transform 0.2s ease;
}

.like-button:hover .heart-icon {
  transform: scale(1.1);
}
</style>