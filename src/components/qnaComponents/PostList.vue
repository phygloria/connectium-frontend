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
.common-Container {
  padding: 20px 30px 20px 30px;
}
.common-ContainerLine { 
  width: 100%; box-shadow: 0px 3px 7px #DBFA5F; border-radius: 50px; border: 2px #8CD000 solid; 
  height: auto; min-height: 330px;
  padding: 10px;
  display: flex;
  flex-direction: column; 
}

h2, h5 {
  font-family: Mango Ddobak;
}

.search-container {
  padding: 0 22%; /* 패딩 조정 */
  margin-bottom: 20px; /* 아래 여백 추가 */
}

.search-form {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* 검색창과 버튼 사이 간격 */
}

.search-box {
  padding: 3px;
  width: 100%;
  height: 50px;
  background: white;
  box-shadow: 0px 3px 7px #DBFA5F;
  border-radius: 20px;
  border: 2px #8CD000 solid;
}
.search {
  width: 95%;
  height: 40px;
  border: none;
  outline: none; /* 포커스 시 기본 테두리 제거 */
  background: transparent; /* 배경을 투명하게 설정 */
  font-family: Mango Ddobak; /* 폰트 일관성을 위해 추가 */
  font-size: 15px; /* 적절한 폰트 크기 설정 */
  color: #242424; /* 텍스트 색상 설정 */
  padding: 0 10px; /* 내부 패딩 추가 */
}

.search:focus {
  /* 포커스 시 추가적인 스타일 변경이 필요하다면 여기에 추가 */
}
/* 플레이스홀더 스타일 조정 (선택사항) */
.search::placeholder {
  color: #999;
}

.search-btn-box {
  display: flex;
  
  /* align-self: self-end; */
  /* margin-right: 30%; */
}
.search-icon {
  width: 20px; height: 20px;
  margin-left: 5px; /* 아이콘과 텍스트 사이 간격 */
  
}
.search-btn {
  width: 140px; height: 50px; color:white; font-family: Mango Ddobak; font-size: 20px;
  background: #8CD000; box-shadow: 0px 3px 7px #DBFA5F; border-radius: 15px; border: 2px #8CD000 solid;
  padding-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.goToPost {
  width: 5%;
  align-self: self-end;
  margin-right: 30%;
  color: #8CD000;
  font-size: 20px;
  font-family: Mango Ddobak;
  font-weight: 400;
  word-wrap: break-word;
  display: flex;
}

.q-filter-Container {
  padding: 0 0 0 23%;
  display: flex;
  justify-content: space-between; /* 필터와 글쓰기 버튼을 양쪽 끝으로 정렬 */
  margin-bottom: 10px; /* q-list-Line과의 간격 조정 */
}
.q-filter-Bar {
  /* width: 100%; height: 100%; position: relative; */
  align-items: center;
  display: flex;
}

.q-filter-Text {
  display: flex;
  margin-right: 15px;
  color: rgba(0, 0, 0, 0.70); 
  font-family: Mango Ddobak; 
  font-weight: bold; 
  font-size: 20px; 
  word-wrap: break-word;
  margin-right: 15px;
}

.q-list-Container {
  padding: 0 22% 20px 22%;
}

.q-list-Line {
  width: 100%; box-shadow: 0px 3px 7px #DBFA5F; border-radius: 20px; border: 2px #8CD000 solid; 
  height: auto; min-height: 330px;
  padding: 20px;
  display: flex;
  flex-direction: column; 
}





.q-list-Title {
  display: flex;
  padding: 0 10px 0 20px;
  justify-content: space-between;
  align-items: center;
  width: 100%; height: 45px; 
  color:black; font-family: Mango Ddobak; font-size: 20px;
  background: white; box-shadow: 0px 3px 7px #DBFA5F; border-radius: 10px; border: 2px #8CD000 solid;
  margin-bottom: 10px; /* 각 항목 사이에 간격 추가 */
}
.q-list-Title a {
  text-decoration: none;
  color: #242424;
  font-family: Mango Ddobak;
  font-size: 18px;
  flex-grow: 1;
  text-align: left; /* 왼쪽 정렬 */
}

.q-list-Edit,
.q-list-Delete {
  text-decoration: none;
  color: white;
  font-family: Mango Ddobak;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 15px;
  margin-left: 10px;
  width: 50px; /* 버튼 너비 동일하게 설정 */
  height: 30px; /* 버튼 높이 설정 */
  cursor: pointer;
  transition: all 0.3s ease;
}

.q-list-Edit {
  background-color: #dddddd;
  border: 1px solid #dddddd;

}
.q-list-Delete {
  background-color: #ff7878;
  border: 1px solid #ff7878;
}

.q-list-Edit:hover,
.q-list-Delete:hover {
  opacity: 0.8;
}
</style>