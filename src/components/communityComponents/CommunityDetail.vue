<template>

  <MainTop />

  <div class="common-container">
    <div class="common-container-line">
      <div class="post-detail-container">
        <div v-if="post" class="post-content">
          <div class="post-header">
            <h2>{{ post.title }}</h2>
            <p>작성자: {{ post.authorName }}</p>
            <p>카테고리: {{ post.category }}</p>
          </div>
          <div class="post-body">
            <div class="post-text">{{ post.content }}</div>
          </div>
          <div class="post-actions">
            <router-link :to="`/community/edit/${post.id}`" class="action-button edit">수정</router-link>
            <button @click="deletePost" class="action-button delete">삭제</button>
            <router-link to="/community" class="action-button back">목록으로 돌아가기</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import MainTop from '@/components/MainTop.vue'

import api from '@/services/api.js'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const post = ref(null)

const fetchPost = async () => {
  try {
    const response = await api.getCommunityPostById(route.params.id)
    post.value = response
  } catch (error) {
    console.error('Error fetching post:', error)
  }
}

const deletePost = async () => {
  if (confirm('정말로 이 글을 삭제하시겠습니까?')) {
    try {
      await api.deleteCommunityPost(route.params.id)
      router.push('/community')
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }
}

onMounted(fetchPost)
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

.post-text {
  color: #333;
  line-height: 1.6;
}


.post-body {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.post-actions {
  margin-top: 20px;
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