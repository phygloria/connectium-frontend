<template>
    <div class="edit-post-container" v-if="post">
      <h2>글 수정</h2>
      <form @submit.prevent="updatePost">
        <div>
          <label for="title">제목:</label>
          <input id="title" v-model="post.title" required>
        </div>
        <div>
          <label for="authorName">작성자:</label>
          <input id="authorName" v-model="post.authorName" required>
        </div>
        <div>
          <label for="category">카테고리:</label>
          <select id="category" v-model="post.category" required>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        <div>
          <label for="content">내용:</label>
          <textarea id="content" v-model="post.content" required></textarea>
        </div>
        <button type="submit">수정 완료</button>
      </form>
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
      const categories = ['나', '이', '구', '분']
  
      const fetchPost = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/community/${route.params.id}`)
          post.value = response.data
        } catch (error) {
          console.error('Error fetching post:', error)
        }
      }
  
      const updatePost = async () => {
        try {
          await axios.put(`http://localhost:8080/api/community/${route.params.id}`, post.value)
          router.push(`/community/${route.params.id}`)
        } catch (error) {
          console.error('Error updating post:', error)
        }
      }
  
      onMounted(fetchPost)
  
      return {
        post,
        categories,
        updatePost
      }
    }
  }
  </script>
  
  <style scoped>
  .edit-post-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  form div {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 8px;
  }
  
  textarea {
    height: 150px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>