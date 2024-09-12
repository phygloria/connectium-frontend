<template>
  <div class="post-detail-container">
    <div v-if="post" class="post-content">
      <div class="post-header">
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-author">작성자: {{ post.author }}</p>
      </div>
      <div v-if="post.imagePath" class="image-container">
        <img :src="getImageUrl(post.imagePath)" :alt="post.title" class="post-image">
      </div>
      <div class="post-body">
        <p class="post-text">{{ post.content }}</p>
      </div>
      <div class="post-actions">
        <router-link :to="`/post/${post.id}/edit`" class="action-button edit">수정</router-link>
        <button @click="deletePost" class="action-button delete">삭제</button>
        <router-link to="/postList" class="action-button back">목록으로 돌아가기</router-link>
      </div>
    </div>
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
.post-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f8e3;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.post-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
}

.post-header {
  border-bottom: 2px solid #8ac007;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.post-title {
  color: #8ac007;
  font-size: 24px;
  margin-bottom: 10px;
}

.post-author {
  color: #666;
  font-size: 14px;
}

.image-container {
  margin: 20px 0;
  text-align: center;
}

.post-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-body {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.post-text {
  color: #333;
  line-height: 1.6;
}

.post-actions {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}

.action-button {
  padding: 8px 15px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

.action-button.edit {
  background-color: #8ac007;
  color: white;
}

.action-button.delete {
  background-color: #ff6b6b;
  color: white;
  border: none;
  cursor: pointer;
}

.action-button.back {
  background-color: #f0f8e3;
  color: #8ac007;
  border: 1px solid #8ac007;
}

.action-button:hover {
  opacity: 0.8;
}
</style>