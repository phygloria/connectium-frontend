<template>
    <div class="community-container">
      <h1 class="community-title">우리아이 커뮤니티</h1>
      <p class="community-subtitle">우리아이를 돌아보세요!</p>
      
      <div class="content-wrapper">
        <div class="category-buttons">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectCategory(category)"
            :class="{ active: selectedCategory === category }"
          >
            {{ category }}
          </button>
        </div>
        
        <div class="post-list">
          <router-link to="/community/create" class="create-post-button">글쓰기</router-link>
          
          <div v-for="post in filteredPosts" :key="post.id" class="post-item">
            <router-link :to="`/community/${post.id}`">
              <h3>{{ post.title }}</h3>
            </router-link>
            <span class="post-author">{{ post.authorName }}</span>
            <span class="post-category">{{ post.category }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  
  export default {
    setup() {
      const categories = ref(['나', '이', '구', '분'])
      const posts = ref([])
      const selectedCategory = ref(null)
  
      const fetchPosts = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/community')
          posts.value = response.data
        } catch (error) {
          console.error('Error fetching posts:', error)
        }
      }
  
      const selectCategory = async (category) => {
        selectedCategory.value = category
        try {
          const response = await axios.get(`http://localhost:8080/api/community/category/${category}`)
          posts.value = response.data
        } catch (error) {
          console.error('Error fetching posts by category:', error)
        }
      }
  
      const filteredPosts = computed(() => {
        if (selectedCategory.value) {
          return posts.value.filter(post => post.category === selectedCategory.value)
        }
        return posts.value
      })
  
      onMounted(fetchPosts)
  
      return {
        categories,
        selectedCategory,
        filteredPosts,
        selectCategory
      }
    }
  }
  </script>
  
  <style scoped>
  .community-container {
    font-family: 'Arial', sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
  }
  
  .community-title {
    font-size: 24px;
    color: #333;
    text-align: center;
  }
  
  .community-subtitle {
    font-size: 16px;
    color: #666;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .content-wrapper {
    display: flex;
    gap: 20px;
  }
  
  .category-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .category-buttons button {
    padding: 10px;
    border: none;
    background-color: #fff;
    color: #333;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .category-buttons button.active {
    background-color: #4CAF50;
    color: white;
  }
  
  .post-list {
    flex-grow: 1;
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
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
  }
  
  .post-item {
    background-color: white;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .post-item h3 {
    margin: 0 0 10px 0;
    color: #333;
  }
  
  .post-item p {
    color: #666;
    margin-bottom: 10px;
  }
  
  .post-category, .post-time {
    font-size: 12px;
    color: #999;
    margin-right: 10px;
  }
  .create-post-button {
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>