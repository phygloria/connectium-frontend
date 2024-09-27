<template>
  <div class="common-container">
    <div class="common-container-line">
      <div class="content-list-container">
        <div class="content-list-warpper">
          <div class="title-container">
            <div class="title-bar">
              <h1 class="title">바깥공기 마시자</h1>
              <h5 class="sub-title">중랑구 산책 가기 좋은 곳</h5>
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
                        <img :src="getImageUrl(content.imagePath)" :alt="content.name" class="outdoor-image" />
                      </div>

                      <div class="content-info-box">
                        <div class="content-info-area">
                          <div class="content-info">
                            <h3 class="content-title">{{ content.name }}</h3>
                            <p class="content-location">{{ content.address }}</p>
                            <p class="content-feature">{{ content.feature }}</p>
                            <p clss="content-fee">{{ content.ent_fee }}</p>
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
  </div>
</template>

<script setup>
import '@/assets/css/common_container.css';
import '@/assets/css/contents_list.css';

import api from '@/services/api';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const parks = ref([]);
const isLoading = ref(true);
const error = ref(false);
const activeFilter = ref('all');

const filters = [
  { value: 'all', label: '전체보기' },
  { value: '무료', label: '무료' },
  { value: '유료', label: '유료' }
];

const fetchParks = async () => {
  try {
    const response = await api.getAllParks();
    parks.value = response.map(park => ({ ...park, }));
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching parks:', error);
    error.value = '데이터를 불러오는 데 실패했습니다.';
    isLoading.value = false;
  }
};

const filterFunctions = {
  all: () => true,
  '무료': park => park.ent_fee === '무료',
  '유료': park => park.ent_fee !== '무료'
};

const filteredEvents = computed(() => {
  const filterFunction = filterFunctions[activeFilter.value] || filterFunctions.all;
  return parks.value.filter(filterFunction);
});

// const toggleLike = (id) => {
//   const park = parks.value.find(p => p.id === id);
//   if (park) {
//     park.liked = !park.liked;
//   }
// };

const getImageUrl = (imagePath) => {
  if (!imagePath) return '/path/to/default/image.jpg';  // 기본 이미지 경로
  const imageName = imagePath.split('/').pop(); // 파일 이름만 추출
  return api.getParkImage(imageName);
};

const navigateToDetail = (content) => {
  router.push(`/outdoor/park/${content.id}`);
};

onMounted(fetchParks);
</script>

<style scoped>
.img-area {
    /* flex: 0 0 300px; */
    /* height: 120px; */
    background: #e2e2e2;
    border-radius: 10px;
    left: -70px;
    top: -25px;
    margin-right: 20px;

}


</style>
