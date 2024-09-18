<template>
    <div class="common-container">
        <div class="common-container-line">
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
                                        <img :src="getImageUrl(content.imagePath)" :alt="content.name" />
                                    </div>

                                    <div class="content-info-box">
                                        <div class="content-info-area">
                                            <div class="content-info">
                                                <h3 class="content-name">{{ content.name }}</h3>
                                                <p class="content-address">{{ content.address }}</p>
                                                <p class="content-feature">{{ content.feature }}</p>
                                                <p clss="content-fee">{{ content.ent_fee }}</p>
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
const parks = ref([]);
const isLoading = ref(true);
const activeFilter = ref('all');

const filters = [
  { value: 'all', label: '전체보기' },
//   { value: '필터1', label: '필터1' },
//   { value: '필터2', label: '필터2' },
  { value: '무료', label: '무료' },
  { value: '유료', label: '유료' }
];

const fetchParks = async () => {
  try {
    const response = await api.getAllParks();
    parks.value = response.map(park => ({...park, liked: false}));
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching parks:', error);
    isLoading.value = false;
  }
};

const filterFunctions = {
  all: () => true,
//   '필터1': park => park.category === '필터1',
//   '필터2': park => park.category === '필터2',
  '무료': park => park.ent_fee === '무료',
  '유료': park => park.ent_fee !== '무료'
};

const filteredEvents = computed(() => {
  const filterFunction = filterFunctions[activeFilter.value] || filterFunctions.all;
  return parks.value.filter(filterFunction);
});

const toggleLike = (id) => {
  const park = parks.value.find(p => p.id === id);
  if (park) {
    park.liked = !park.liked;
  }
};

const getImageUrl = (imagePath) => {
  return `http://localhost:8080/api/outdoorImages/${imagePath}`;
};

const navigateToDetail = (content) => {
  router.push(`/outdoor/park/${content.id}`);
};

onMounted(fetchParks);
</script>