<template>

  <div class="common-Container">
    <div class="common-ContainerLine">
      <div class="titleContainer">
        <div class="titleBox">
          <h2>Q & A</h2>
          <h5>무엇이든 물어보세요!</h5>
        </div>
      </div>
      <div class="search-warpper">  
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
      </div>
      <div class="filter-warpper">
        <div class="filter-Container">
          <div class="filter-Bar">
            <div class="filter-Text">최신순</div>
            <div class="filter-Text">댓글많은순</div>
            <div class="filter-Text">좋아요순</div>
            <div class="filter-Text">오래된순</div>
          </div>
          <div class="post">
            <router-link to="/post/create" class="goToPost">글쓰기</router-link>
          </div>
        </div>
      </div>
      

      <div class="list-Container">
        <div class="list-Line">
          <div class="list-box">
            <div class="list-bar">
              <div class="list-Title" v-for="post in posts" :key="post.id">
                <div>
                  <router-link :to="`/post/${post.id}`"> {{ post.title }} </router-link> 
                  <p class="post-view-count">조회수: {{ post.viewCount }}</p>               
                </div>
                <div class="list-edNdel">
                  <router-link :to="`/post/${post.id}/edit`" class="list-Edit">수정</router-link>
                  <button @click="deletePost(post.id)" class="list-Delete">삭제</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button @click="prevPage" :disabled="page === 0">이전</button>
        <span>페이지: {{ page+1 }}</span>
        <button @click="nextPage">다음</button>
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
const page = ref(0);  // 현재 페이지 번호
const size = ref(5); // 페이지당 게시물 수

// 전체 목록 불러오기
// const fetchPosts = async () => {
//   try {
//     posts.value = await api.getAllPosts();
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//   }
// };

// 페이징 처리해서 전체 목록 불러오기
const fetchPosts = async () => {
  try {
    posts.value = await api.getAllPosts(page.value, size.value);  
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

const prevPage = () => {
  if (page.value > 0) {
    page.value -= 1;
    fetchPosts();
  }
};

const nextPage = () => {
  page.value += 1;
  fetchPosts();
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