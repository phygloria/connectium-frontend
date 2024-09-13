<template>

  <div class="common-Container">
    <div class="common-ContainerLine">
      <div class="titleContainer">
        <div class="titleBox">
          <h2>Q & A</h2>
          <h5>무엇이든 물어보세요!</h5>
        </div>
      </div>  
      <div class="search-container">                                
        <form @submit.prevent="questionSearch" class="search-form">
          <div class="search-box">                            
            <input type="text" class="search" v-model="searchQuery" placeholder="질문 검색하기" />
          </div>
          <div class="search-btn-box">
            <button type="submit" class="search-btn">
              검색하기
              <img class="search-icon" src="@/assets/images/icon/searchtool.png" alt="검색"/>
            </button>
          </div>
        </form>
      </div>
      <div class="q-filter-Container">
        <div class="q-filter-Bar">
          <div class="q-filter-Text">최신순</div>
          <div class="q-filter-Text">댓글많은순</div>
          <div class="q-filter-Text">좋아요순</div>
          <div class="q-filter-Text">오래된순</div>
        </div>
        <router-link to="/post/create" class="goToPost">글쓰기</router-link>
      </div>
      

      <div class="q-list-Container">
        <div class="q-list-Line">
          <div class="q-list-box">
            <div class="q-list-bar">
              <div class="q-list-Title" v-for="post in posts" :key="post.id">
                <router-link :to="`/post/${post.id}`"> {{ post.title }} </router-link>                
                
                <div>
                  <router-link :to="`/post/${post.id}/edit`" class="q-list-Edit"> 수정 </router-link>
                  <button @click="deletePost(post.id)" class="q-list-Delete">삭제</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import '@/assets/css/post_list.css';
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const posts = ref([]);
const searchQuery = ref('');

const fetchPosts = async () => {
  try {
    posts.value = await api.getAllPosts();
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

const deletePost = async (id) => {
  try {
    await api.deletePost(id);
    await fetchPosts();  // 목록 새로고침
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

const questionSearch = () => {
  console.log('Searching for:', searchQuery.value);
  // 검색 로직 구현
};

onMounted(fetchPosts);
</script>

<style scoped>

</style>