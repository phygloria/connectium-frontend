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
              <div class="list-in-column">
                <div class="list-card" v-for="content in filteredEvents" :key="content.id" @click="navigateToDetail(content)">
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
                      <div class="like-area">
                        <button class="like-button" @click="toggleLike(content.id)">
                          <img 
                            :src="content.liked ? require('@/assets/images/icon/heart_icon_in_pink.png') : require('@/assets/images/icon/flat_heart_shape.png')"
                            :alt="content.liked ? '좋아요 취소' : '좋아요'"
                            class="heart-icon"
                          >                          
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
import '@/assets/css/common_container.css';
import '@/assets/css/contents_list.css';
import '@/assets/css/like.css';
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
  // { value: 'education', label: '교육프로그램' },
  { value: 'free', label: '무료' },
  { value: 'paid', label: '유료' }
];

const filterFunctions = {
  all: () => true,
  culture: content => content.type === 'program1',
  // education: content => content.type === 'program2',
  free: content => content.payatnm === '무료',
  paid: content => content.payatnm === '유료'
};

// const filteredEvents = computed(() => 
//   programs.value.filter(filterFunctions[activeFilter.value])
// );

const filteredEvents = computed(() => 
  programs.filter(filterFunctions[activeFilter.value])
);


// const toggleLike = (content) => {
//   // Vue의 반응성 시스템을 활용하여 업데이트
//   const index = programs.value.findIndex(e => e.id === content.id);
//   if (index !== -1) {
//     programs.value[index] = { ...programs.value[index], liked: !programs.value[index].liked };
//   }
// };
const toggleLike = (eventId) => {
  const content = programs.find(e => e.id === eventId);
  if (content) {
    content.liked = !content.liked;
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
  programs.push(...initialPrograms.value.map(content => ({
    ...content,
    id: generateUniqueId(),
    liked: false // 초기 좋아요 상태 설정
  })));
});

const navigateToDetail = (content) => {
  router.push({ 
    name: 'programDetail', 
    params: { 
      type: content.type === 'program1' ? 'CulProgram' : 'EduProgram', 
      svcid: content.svcid 
    } 
  });
};

</script>


<style scoped>


</style>