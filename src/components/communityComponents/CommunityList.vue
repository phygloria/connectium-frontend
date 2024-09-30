<template>

  <MainTop />

  <div class="common-container">
    <div class="common-container-line">
      <div class="list-container">
        <div class="list-warpper">
          <div class="commponent-title">
            <h1 class="community-title">우리아이 커뮤니티</h1>
            <p class="community-subtitle">우리아이를 돌아보세요!</p>
          </div>
          <!-- <div class="post-btn">
            <router-link to="/community/create" class="create-post-button">글쓰기</router-link>
          </div> -->
          <div class="content-wrapper">
            <div class="category-buttons">
              <router-link v-for="category in categories" :key="category.value"
                :to="{ name: 'FilteredCommunity', params: { category: category.value } }" custom
                v-slot="{ navigate, isActive }">
                <div class="btn-container">
                  <button @click="navigate" :class="{ active: isActive }">
                    <div class="category-image-container">
                      <img :src="category.imagePath" :alt="category.label" class="category-image">
                      <span class="category-label">{{ category.label }}</span>
                    </div>
                  </button>
                </div>
              </router-link>
            </div>

          </div>
        </div>

        <div class="list-wrapper" hidden>
          <div class="post-list">
            <div v-for="post in filteredPosts" :key="post.id" class="post-item">
              <router-link :to="{ name: 'CommunityDetail', params: { id: post.id } }" class="post-title">
                <h3>{{ post.title }}</h3>
              </router-link>
              <div class="post-item-wrapper">
                <span class="post-category">{{ post.category }}</span>
                <div class="list-ediNdelNcount">
                  <span class="post-view-count">조회수: {{ post.viewCount }}</span>
                  <span class="post-author">작성자: {{ post.author }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="background-image"></div>
    </div>
  </div>

</template>


<script setup>
import '@/assets/css/community_list.css'
import '@/assets/css/post_list.css'
import '@/assets/css/common_container.css'
import MainTop from '@/components/MainTop.vue'

// 이미지 import
import img0to2 from '@/assets/images/community/category-under-2.png'
import img3to5 from '@/assets/images/community/category-under-5.png'
import img6to7 from '@/assets/images/community/category-under-7.png'
import img8to9 from '@/assets/images/community/category-under-9.png'
import img10to11 from '@/assets/images/community/category-over-10.png'
import imgOver12 from '@/assets/images/community/category-over-12.png'

import api from '@/services/api';
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const posts = ref([])

// const categories = [
//   { value: '5세미만', label: '5세미만', imagePath: imgUnder5 },
//   { value: '5세~6세', label: '5세~6세', imagePath: img5to6 },
//   { value: '7세~9세', label: '7세~9세', imagePath: img7to9 },
//   { value: '10세이상', label: '10세이상', imagePath: imgOver10 }
// ];
const categories = [
  { value: '영유아(0~2세)', label: '영유아(0~2세)', imagePath: img0to2 },
  { value: '유아(3~5세)', label: '유아(3~5세)', imagePath: img3to5 },
  { value: '취학 전 아동(6~7세)', label: '취학 전 아동(6~7세)', imagePath: img6to7 },
  { value: '초등학교 저학년(8~9세)', label: '초등학교 저학년(8~9세)', imagePath: img8to9 },
  { value: '초등학교 중학년(10~11세)', label: '초등학교 중학년(10~11세)', imagePath: img10to11 },
  { value: '초등학교 고학년(12~13세)', label: '초등학교 고학년(12~13세)', imagePath: imgOver12 }
];


const fetchPosts = async () => {
  try {
    const response = await api.getAllCommunityPosts()
    posts.value = response
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}

const filteredPosts = computed(() => {
  const category = route.params.category;
  if (category) {
    return posts.value.filter(post => post.category === category);
  }
  return posts.value;
});

onMounted(async () => {
  await fetchPosts();
})
</script>






<style scoped>

.content-wrapper {
  width: 100%;
  padding: 20px 0;
}

.category-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 100%; /* 최대 너비를 100%로 제한 */
  margin: 0 auto;
}

.btn-container {
  flex: 0 0 calc(50% - 10px); /* 2개씩 배치 */
  max-width: 300px; /* 최대 너비 제한 */
  
}

.category-buttons button {
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  width: 100%;
  height: 100%; /* 높이를 100%로 설정 */
  padding: 10px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  
}

.category-buttons button:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 15px rgba(173, 253, 43, 0.7);
}

.category-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%; /* 컨테이너 높이를 100%로 설정 */
  overflow: hidden; /* 이 줄을 추가합니다 */
}

.category-image {
  width: 70%;
  height: auto; /* 높이를 자동으로 조정 */
  object-fit: contain;
  margin-bottom: 10px;
  max-width: 100%;
}

.category-label {
  text-align: center;
  font-weight: bold;
  font-size: 0.9em;
  width: 100%;
  
}

</style>
