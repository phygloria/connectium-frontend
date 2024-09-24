<template>
  <div class="common-container">
    <div class="common-container-line">
      <div class="title-container">
        <div class="title-bar">
          <h1 class="title">교육 프로그램</h1>
          <h5 class="sub-title">교육 프로그램</h5>
          <div class="filter-bar">
            <div class="filters">
              <button v-for="filter in filters" :key="filter.value" @click="activeFilter = filter.value"
                :class="{ active: activeFilter === filter.value }">
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
                <div class="list-card" v-for="content in filteredEvents" :key="content.id"
                  @click="navigateToDetail(content)">
                  <div class="img-area">
    <img 
      :src="getImageUrl(content.imagePath)" 
      :alt="content.name"
      class="education-image"
    />
  </div>

                  <div class="content-info-box">
                    <div class="content-info-area">
                      <div class="content-info">
                        <h3 class="content-name">{{ content.name }}</h3>
                        <p class="content-registration">접수기간: {{ content.registrationPeriod }}</p>
                        <p class="content-target">대상: {{ content.targetAudience }}</p>
                        <p class="content-location">장소: {{ content.location }}</p>
                        <p class="content-cost">비용: {{ content.cost || '무료' }}</p>
                      </div>
                      
                      <div class="like-area">
                        <button class="like-button" @click="toggleLike(content.id)">
                          <img :src="content.liked ? require('@/assets/images/icon/heart_icon_in_pink.png') : require('@/assets/images/icon/flat_heart_shape.png')"
                            :alt="content.liked ? '좋아요 취소' : '좋아요'" 
                            class="heart-icon">
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const educations = ref([]);
const isLoading = ref(true);
const error = ref(null);
const activeFilter = ref('all');

const filters = [
  { value: 'all', label: '전체보기' },
  { value: 'free', label: '무료' },
  { value: 'paid', label: '유료' }
];

const fetchEducations = async () => {
  try {
    const response = await api.getAllEducations();
    educations.value = response.map(education => ({...education, liked: false}));
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching educations:', error);
    error.value = '데이터를 불러오는 데 실패했습니다.';
    isLoading.value = false;
  }
};

const filterFunctions = {
  all: () => true,
  free: education => !education.cost || education.cost === '무료',
  paid: education => education.cost && education.cost !== '무료'
};

const filteredEvents = computed(() => {
  const filterFunction = filterFunctions[activeFilter.value] || filterFunctions.all;
  return educations.value.filter(filterFunction);
});

const toggleLike = (id) => {
  const education = educations.value.find(e => e.id === id);
  if (education) {
    education.liked = !education.liked;
  }
};

// const getImageUrl = (imageName) => {
//   if (!imageName) return '/path/to/default/image.jpg';  // 기본 이미지 경로
//   return api.getEducationImageUrl(imageName);
// };

const getImageUrl = (imagePath) => {
  if (!imagePath) return '/path/to/default/image.jpg';  // 기본 이미지 경로
  const imageName = imagePath.split('/').pop(); // 파일 이름만 추출
  return api.getEducationImageUrl(imageName);
};

const navigateToDetail = (content) => {
  router.push(`/education/${content.id}`);
};

onMounted(fetchEducations);
</script>

<style scoped>


.img-area {
  width: 100%;
  height: 200px; /* 원하는 높이로 조정하세요 */
  overflow: hidden;
  position: relative;
}

.education-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.img-area:hover .education-image {
  transform: scale(1.1);
}
.detail-img-area {
  width: 100%;
  height: 400px; /* 원하는 높이로 조정하세요 */
  overflow: hidden;
  position: relative;
  border-radius: 8px; /* 이미지 모서리를 둥글게 만듭니다 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 이미지에 그림자 효과를 줍니다 */
}

.education-detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.detail-img-area:hover .education-detail-image {
  transform: scale(1.05);
}

/* 반응형 디자인을 위한 미디어 쿼리 */
@media (max-width: 768px) {
  .detail-img-area {
    height: 250px; /* 모바일 화면에서는 더 작게 */
  }
}
</style>