<template>
    <div class="post-detail-container" v-if="post">
      <h2>{{ post.title }}</h2>
      <p>작성자: {{ post.authorName }}</p>
      <p>카테고리: {{ post.category }}</p>
      <div class="post-content">{{ post.content }}</div>
      <div class="post-actions">
        <router-link :to="`/community/edit/${post.id}`" class="edit-button">수정</router-link>
        <button @click="deletePost" class="delete-button">삭제</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRoute, useRouter } from 'vue-router'
  
  export default {
    setup() {
      const route = useRoute()
      const router = useRouter()
      const post = ref(null)
  
      const fetchPost = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/community/${route.params.id}`)
          post.value = response.data
        } catch (error) {
          console.error('Error fetching post:', error)
        }
      }
  
      const deletePost = async () => {
        if (confirm('정말로 이 글을 삭제하시겠습니까?')) {
          try {
            await axios.delete(`http://localhost:8080/api/community/${route.params.id}`)
            router.push('/community')
          } catch (error) {
            console.error('Error deleting post:', error)
          }
        }
      }
  
      onMounted(fetchPost)
  
      return {
        post,
        deletePost
      }
    }
  }
  </script>
  
  <style scoped>
  .post-detail-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .post-content {
    margin-top: 20px;
    white-space: pre-wrap;
  }
  
  .post-actions {
    margin-top: 20px;
  }
  
  .edit-button, .delete-button {
    padding: 10px 20px;
    margin-right: 10px;
    text-decoration: none;
    color: white;
    border-radius: 5px;
  }
  
  .edit-button {
    background-color: #4CAF50;
  }
  
  .delete-button {
    background-color: #f44336;
  }
  </style>