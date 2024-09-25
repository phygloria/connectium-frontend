<template>
    <div class="create-post-container">
      <h2>새 글 작성</h2>
      <form @submit.prevent="createPost">
        <div>
          <label for="title">제목:</label>
          <input id="title" v-model="newPost.title" required>
        </div>
        <!-- <div>
          <label for="authorName">작성자:</label>
          <input id="authorName" v-model="newPost.authorName" required>
        </div> -->
        <div>
          <label for="category">카테고리:</label>
          <select id="category" v-model="newPost.category" required>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        <div>
          <label for="content">내용:</label>
          <textarea id="content" v-model="newPost.content" required></textarea>
        </div>
        <button type="submit">글 등록</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  export default {
    setup() {
      const router = useRouter()
      const categories = ['나', '이', '구', '분']
      const newPost = ref({
        title: '',
        authorName: '',
        content: '',
        category: '나'
      })
  
      const createPost = async () => {
        try {
          await axios.post('http://localhost:8080/api/community', newPost.value)
          router.push('/community')
        } catch (error) {
          console.error('Error creating post:', error)
        }
      }
  
      return {
        categories,
        newPost,
        createPost
      }
    }
  }
  </script>
  
  <style scoped>
  .create-post-container {
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