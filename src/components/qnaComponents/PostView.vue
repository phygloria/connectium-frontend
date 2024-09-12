<template>
    <div v-if="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <p>작성자: {{ post.author }}</p>

          <!-- 이미지 표시 부분 -->
    <div v-if="post.imagePath" class="image-container">
      <img :src="getImageUrl(post.imagePath)" :alt="post.title" class="post-image">
    </div>

      <router-link :to="`/post/${post.id}/edit`">수정</router-link>
      <button @click="deletePost">삭제</button>
      <router-link to="/postList">목록으로 돌아가기</router-link>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const route = useRoute();

const post = ref(null);

const fetchPost = async () => {
  try {
    post.value = await api.getPostById(route.params.id);
    console.log('Fetched post:', post.value); // 디버깅을 위한 로그
  } catch (error) {
    console.error('Error fetching post:', error);
  }
};

const deletePost = async () => {
  try {
    await api.deletePost(route.params.id);
    router.push('/');
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

// const getImageUrl = (imagePath) => {
//   if (imagePath) {
//     return `http://localhost:8080/api/images/${imagePath}`;
//   }
//   return '';
// };

const getImageUrl = (imagePath) => {
  if (imagePath) {
    return `http://localhost:8080${imagePath}`;
  }
  return '';
};

onMounted(fetchPost);
</script>

<style scoped>
.image-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

.post-image {
  max-width: 100%;
  height: auto;
}
</style>