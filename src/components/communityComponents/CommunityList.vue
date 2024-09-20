<template>

  <MainTop />

  <div class="common-container">
    <div class="common-container-line">
      <div class="community-container">
        <h1 class="community-title">우리아이 커뮤니티</h1>
        <p class="community-subtitle">우리아이를 돌아보세요!</p>

        <div class="content-wrapper">
          <div class="category-buttons">
            <button v-for="category in categories" :key="category.value" 
              @click="selectCategory(category.value)"
              :class="{ active: selectedCategory === category.value }">
              {{ category.label }}
            </button>
          </div>
          <div class="post-btn">
            <router-link to="/community/create" class="create-post-button">글쓰기</router-link>
          </div>
        </div>
        
        <div class="list-wrapper">
          <div class="post-list">
            <div v-for="post in filteredPosts" :key="post.id" class="post-item">
              <router-link :to="`/community/${post.id}`">
                <h3 class="post-title">{{ post.title }}</h3>
              </router-link>
              <div class="post-item-wrapper">
                <span class="post-category">{{ post.category }}</span>
                <span class="post-author">{{ post.authorName }}</span>
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
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api';
import MainTop from '@/components/MainTop.vue'

const posts = ref([])

const fetchPosts = async () => {
  try {
    const response = await api.getAllCommunityPosts()
    posts.value = response
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}

const selectedCategory = ref('all')

const categories = [
  { value: 'all', label: '전체' },
  { value: '5세미만', label: '5세미만' },
  { value: '5세~6세', label: '5세~6세' },
  { value: '7~9세', label: '7~9세' },
  { value: '10세이상', label: '10세이상' }
];

const filterFunctions = {
  all: () => true,
  '5세미만': post => post.category === '5세미만',
  '5세~6세': post => post.category === '5세~6세',
  '7~9세': post => post.category === '7~9세',
  '10세이상': post => post.category === '10세이상'
};


const selectCategory = (category) => {
  selectedCategory.value = category;
}

const filteredPosts = computed(() => {
  const filterFunction = filterFunctions[selectedCategory.value] || filterFunctions.all;
  return posts.value.filter(filterFunction);
});

onMounted(fetchPosts)
</script>

<style scoped>


.community-container {
  font-family: 'Arial', sans-serif;
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 40px;
}

.community-title {
  color: #333;
  text-align: center;
  color: black;
  font-size: 50px;
  font-family: MangoByeolbyeol;
  font-weight: 400;
  word-wrap: break-word
}

.community-subtitle {
  color: #1E1E1E;
  font-size: 30px;
  font-family: Ownglyph meetme;
  font-weight: 400;
  word-wrap: break-word
}

.content-wrapper {
  display: flex;
  gap: 20px;
  justify-content: center; /* 수직 중앙 정렬 */
}

.category-buttons {
  height: 50px;
  margin-bottom: 20px;
  color: black;
  font-size: 25px;
  font-family: Pretendard;
  font-weight: 400;
  word-wrap: break-word;
  display: flex;
  flex-wrap: wrap;  /* 버튼이 넘칠 경우 줄바꿈 */
  justify-content: center;  /* 버튼들을 중앙 정렬 */
}

/* 버튼 비활성화 상태 */
.category-buttons button {
  width: auto;  /* 내용에 맞게 너비 조정 */
  height: 50px;
  margin-right: 10px;
  margin-bottom: 10px;  /* 세로 정렬 시 버튼 간 간격 */
  padding: 5px 10px;
  border: none;
  background-color: #ffffff;
  cursor: pointer;
  border-radius: 20px;
  border: 2px #C0EA6A solid;
  white-space: nowrap;  /* 버튼 내 텍스트를 한 줄로 유지 */
  overflow: hidden;
  max-width: 100%;  /* 부모 컨테이너를 넘지 않도록 */
}

/* 버튼 활성화 상태 */
.category-buttons button.active {
  background-color:  #90ce2d;
  color: white;
  width: auto;  /* 내용에 맞게 너비 조정 */
  height: 50px; border-radius: 20px; border: 2px #C0EA6A solid;
}

.post-list {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.post-input {
  display: flex;
  margin-bottom: 20px;
}

.post-input input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px 0 0 5px;
}

.post-button {
  padding: 5px 50px;
  background-color:  #90ce2d;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.post-item {
  background-color: white;
  padding: 10px; /* 패딩 조금 늘림 */
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 제목과 정보 사이 공간 분배 */
  min-height: 80px; /* 최소 높이 설정 */
}

.post-title {
  margin-right: auto; /* 이 줄을 추가하여 오른쪽 정렬 */ 
  margin-left: 30px;
  color: #333;
  text-decoration: none;
}

.post-item p {
  display: flex;
  color: #666;
  margin-bottom: 10px;
}

.post-item-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center; /* 수직 중앙 정렬 */
  height: 20px; /* 높이 지정 */

}

.post-category{
  font-size: 12px;
  color: #999;
  margin-right: auto; /* 이 줄을 추가하여 오른쪽 정렬 */  
  margin-left: 10px;
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
}
.post-author {
  font-size: 12px;
  color: #999;
  margin-left: auto; /* 이 줄을 추가하여 오른쪽 정렬 */
  margin-right: 10px;
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
}
.post-btn {
  display: flex;
  margin-bottom: 5px;

}
.create-post-button {
  align-self: flex-end;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color:  #90ce2d;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>