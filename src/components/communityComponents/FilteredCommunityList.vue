<template>

    <MainTop />

    <div class="common-container">
        <div class="common-container-line">
            <div class="list-container">
                <div class="list-warpper">

                    <div class="commponent-title">
                        <h1 class="community-title">{{ category }} 커뮤니티방</h1>
                        <p class="community-subtitle">도담도담 이야기 나누어요!</p>
                    </div>
                    <div class="post-btn">
                        <router-link to="/community/create" class="create-post-button">글쓰기</router-link>
                    </div>

                    <div class="category-buttons">
                        <router-link v-for="category in categories" :key="category.value"
                            :to="{ name: 'FilteredCommunity', params: { category: category.value } }" custom
                            v-slot="{ navigate, isActive }">
                            <div class="btn-container">
                                <button @click="navigate" :class="{ active: isActive }">
                                    <div>                                    
                                        <span class="category-label">{{ category.label }}</span>
                                    </div>
                                </button>
                            </div>
                        </router-link>
                    </div>



                    <div class="list-container">
                        <div class="list-Line">
                            <div v-for="post in filteredPosts" :key="post.id" class="post-item">
                                <router-link :to="{ name: 'CommunityDetail', params: { id: post.id } }"
                                    class="post-item-wrapper">
                                    <span class="post-category">{{ post.category }}</span>

                                    <div>
                                        <h3 class="list-title">{{ post.title }}</h3>
                                    </div>

                                    <div class="list-ediNdelNcount">
                                        <span class="post-view-count">조회수: {{ post.viewCount }}</span>
                                        <span class="post-author">{{ post.authorName }}</span>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import '@/assets/css/common_container.css'
import '@/assets/css/community_list.css'
import '@/assets/css/post_list.css'
import MainTop from '@/components/MainTop.vue';

import api from '@/services/api';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';



const route = useRoute();
const category = computed(() => route.params.category);
const posts = ref([]);

const fetchPosts = async () => {
    try {
        const response = await api.getAllCommunityPosts();
        posts.value = response;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

// const filteredPosts = computed(() => {
//     return posts.value.filter(post => post.category === category.value);
// });

const filteredPosts = computed(() => {
  const category = route.params.category;
  if (category) {
    return posts.value.filter(post => post.category === category);
  }
  return posts.value;
});

const categories = [
  { value: '영유아(0~2세)', label: '0~2세'},
  { value: '유아(3~5세)', label: '3~5세' },
  { value: '취학 전 아동(6~7세)', label: '6~7세'},
  { value: '초등학교 저학년(8~9세)', label: '8~9세' },
  { value: '초등학교 중학년(10~11세)', label: '10~11세' },
  { value: '초등학교 고학년(12~13세)', label: '12~13세' }
];

onMounted(fetchPosts);
</script>







<style scoped>
/* 여기에 필요한 스타일을 추가하세요 */

.content-wrapper {
    display: flex;
    gap: 10px;
  }


  .category-buttons {
    display: flex;
    justify-content: center; /* 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    flex-wrap: nowrap; /* 줄바꿈 방지 */
    margin-bottom: 20px;
    width: 100%; /* 전체 너비 사용 */
    height: auto; /* 높이 자동 조정 */
}
  
/* .btn-container {

} */
.category-buttons .btn-container {
    flex: 0 0 calc(0% - 1px); /* 버튼 크기 고정 */
}



  /* 버튼 비활성화 상태 */
  .category-buttons button {
    height: 40px; /* 버튼 높이 고정 */
    width: 70%;
    padding: 5px 10px;
    border: none;
    background-color: #ffffff;
    cursor: pointer;
    border-radius: 20px;
    border: 2px #C0EA6A solid;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    overflow: hidden;
  
    font-family: "MangoDdobak-B", sans-serif;
    /* 폰트 적용 */
    font-size: 20px; /* 폰트 크기 조정 */
    font-weight: 500;
    /* 폰트 굵기 조정 */
    color: #333;
    /* 텍스트 색상 */
  }
  
  /* 버튼 활성화 상태 */
  .category-buttons button.active {
    background-color: #90ce2d;
    color: white;
    height: 40px; /* 버튼 높이 고정 */
    border-radius: 20px;
    border: 2px #C0EA6A solid;
  }
  





  /* 아이패드 12.9인치 */
@media (max-width: 2048px) {
  .category-buttons {
    flex-wrap: wrap;
    gap: 10px;
  }

  .category-buttons .btn-container {
    flex: 0 0 calc(33.33% - 15px);
  }

  .category-buttons button {
    font-size: 20px;
    height: 40px;
  }
}

/* 태블릿 */
@media (max-width: 1024px) {
  .category-buttons {
    gap: 12px;
  }

  .category-buttons .btn-container {
    flex: 0 0 calc(50% - 12px);
  }

  .category-buttons button {
    font-size: 16px;
    height: 45px;
  }
}

/* 모바일 */
@media (max-width: 768px) {
  .category-buttons {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .category-buttons .btn-container {
    flex: 0 0 auto;
    width: 100%;
  }

  .category-buttons button {
    font-size: 14px;
    height: 40px;
    margin-right: 0;
  }
}

/* 소형 모바일 */
@media (max-width: 480px) {
  .category-buttons {
    gap: 8px;
  }

  .category-buttons button {
    font-size: 12px;
    height: 35px;
    padding: 3px 8px;
  }
}

</style>