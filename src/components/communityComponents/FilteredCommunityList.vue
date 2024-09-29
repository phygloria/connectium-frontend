<template>

    <MainTop />

    <div class="common-container">
        <div class="common-container-line">
            <div class="list-container">
                <div class="list-warpper">

                    <div class="commponent-title">
                        <h1>{{ category }} 커뮤니티방</h1>
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
  { value: '5세미만', label: '5세미만'},
  { value: '5세~6세', label: '5세~6세'},
  { value: '7세~9세', label: '7세~9세'},
  { value: '10세이상', label: '10세이상'}
];

onMounted(fetchPosts);
</script>







<style scoped>
/* 여기에 필요한 스타일을 추가하세요 */

.content-wrapper {
    display: flex;
    gap: 20px;
    margin-bottom: 5%;
  }


  .category-buttons {
    display: flex;
    justify-content: center; /* 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    flex-wrap: nowrap; /* 줄바꿈 방지 */
    gap: 10px; /* 버튼 사이의 간격 */
    margin-bottom: 20px;
    width: 100%; /* 전체 너비 사용 */
    height: auto; /* 높이 자동 조정 */
}
  

.category-buttons .btn-container {
    flex: 0 0 auto; /* 버튼 크기 고정 */
}



  /* 버튼 비활성화 상태 */
  .category-buttons button {
    height: 40px; /* 버튼 높이 고정 */
    width: 100%;
    margin-right: 10px;
    margin-bottom: 10px;
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
    font-size: 16px; /* 폰트 크기 조정 */
    font-weight: 500;
    /* 폰트 굵기 조정 */
    color: #333;
    /* 텍스트 색상 */
  }
  
  /* 버튼 활성화 상태 */
  .category-buttons button.active {
    background-color: #90ce2d;
    color: white;
    height: 100%;
    border-radius: 20px;
    border: 2px #C0EA6A solid;
  }
  

</style>