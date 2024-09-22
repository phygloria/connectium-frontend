<template>

  <MainTop />

  <div class="common-container">
    <div class="common-container-line">
      <div class="commponent-title">
        <h1 class="community-title">우리아이 커뮤니티</h1>
        <p class="community-subtitle">우리아이를 돌아보세요!</p>
      </div>
      <div class="post-btn">
        <router-link to="/community/create" class="create-post-button">글쓰기</router-link>
      </div>
      <div class="content-wrapper">
        <div class="category-buttons">
          <router-link v-for="category in categories" :key="category.value"
            :to="{ name: 'FilteredCommunity', params: { category: category.value } }" custom
            v-slot="{ navigate, isActive }">
            <button @click="navigate" :class="{ active: isActive }">
              {{ category.label }}
            </button>
          </router-link>
        </div>

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

</template>


<script setup>
import '@/assets/css/common_container.css'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api';
import MainTop from '@/components/MainTop.vue'

const route = useRoute()

const posts = ref([])

const categories = [
  { value: '5세미만', label: '5세미만' },
  { value: '5세~6세', label: '5세~6세' },
  { value: '7~9세', label: '7~9세' },
  { value: '10세이상', label: '10세이상' }
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
  justify-content: center;
  /* 수직 중앙 정렬 */
  margin-bottom: 5%;
}

.category-buttons {
  margin-bottom: 20px;
  flex-wrap: wrap;
  /* 버튼이 넘칠 경우 줄바꿈 */
  justify-content: space-between;
  /* 버튼들 사이에 공간을 균등하게 분배 */
  gap: 12% 1%;
  /* 버튼 사이의 간격 */
  display: grid;
  /* 2개의 열로 변경 */
  grid-template-columns: repeat(2, minmax(350px, 1fr));
  max-width: 1040px;
  /* 두 카드의 너비(500px * 2) + 간격(20px) */
  height: 350px;
  margin: 0 auto;
  /* 중앙 정렬 */
}

/* 버튼 비활성화 상태 */
.category-buttons button {
  height: 120%;
  width: 100%;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #ffffff;
  cursor: pointer;
  border-radius: 20px;
  border: 2px #C0EA6A solid;
  white-space: nowrap;
  /* 버튼 내 텍스트를 한 줄로 유지 */
  overflow: hidden;

  font-family: "MangoDdobak-B", sans-serif;
  /* 폰트 적용 */
  font-size: 20px;
  /* 폰트 크기 조정 */
  font-weight: 500;
  /* 폰트 굵기 조정 */
  color: #333;
  /* 텍스트 색상 */
}

/* 버튼 활성화 상태 */
.category-buttons button.active {
  background-color: #90ce2d;
  color: white;
  height: 120%;
  border-radius: 20px;
  border: 2px #C0EA6A solid;
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
  background-color: #90ce2d;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.post-item {
  background-color: white;
  padding: 10px;
  /* 패딩 조금 늘림 */
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* 제목과 정보 사이 공간 분배 */
  min-height: 80px;
  /* 최소 높이 설정 */
}

.post-title {
  margin-right: auto;
  /* 이 줄을 추가하여 오른쪽 정렬 */
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
  align-items: center;
  /* 수직 중앙 정렬 */
  height: 20px;
  /* 높이 지정 */

}

.post-category {
  font-size: 12px;
  color: #999;
  margin-right: auto;
  /* 이 줄을 추가하여 오른쪽 정렬 */
  margin-left: 10px;
  display: flex;
  align-items: center;
  /* 수직 중앙 정렬 */
}

.post-author {
  font-size: 12px;
  color: #999;
  margin-left: auto;
  /* 이 줄을 추가하여 오른쪽 정렬 */
  margin-right: 10px;
  display: flex;
  align-items: center;
  /* 수직 중앙 정렬 */
}

.post-btn {
  display: flex;
  margin-bottom: 5px;

}

.create-post-button {
  align-self: flex-end;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #90ce2d;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>