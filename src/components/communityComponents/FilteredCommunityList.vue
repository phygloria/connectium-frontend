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
                <div class="list-container">
                    <div class="list-Line">
                    <div v-for="post in filteredPosts" :key="post.id" class="post-item">
                        <router-link :to="`/community/${post.id}`">
                            <h3 class="list-Title-c">{{ post.title }}</h3>
                        </router-link>
                        <div class="post-item-wrapper">
                            <span class="post-category">{{ post.category }}</span>
                            <div class="list-ediNdelNcount">
                                <span class="post-view-count">조회수: {{ post.viewCount }}</span>
                                <span class="post-author">{{ post.authorName }}</span>
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
import '@/assets/css/common_container.css'
import '@/assets/css/community_list.css'
import '@/assets/css/post_list.css'
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';
import MainTop from '../MainTop.vue';


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

const filteredPosts = computed(() => {
    return posts.value.filter(post => post.category === category.value);
});

onMounted(fetchPosts);
</script>

<style scoped>
/* 여기에 필요한 스타일을 추가하세요 */
.list-Title-c {
  display: flex;
  padding: 0 10px 0 10%;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 45px;
  color: black;
  font-family: Mango Ddobak;
  font-size: 20px;
  background: white;
  border-style: none !important;
  margin-bottom: 10px; /* 각 항목 사이에 간격 추가 */
  text-decoration: none;
}

.list-Title-c h3 {
  text-decoration: none; 
  color: #242424;
  font-family: Mango Ddobak;
  font-size: 18px;
  flex-grow: 1;
  text-align: left; /* 왼쪽 정렬 */
}
</style>