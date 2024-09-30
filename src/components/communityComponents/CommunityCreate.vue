<template>

  <MainTop />

  <div class="common-container">
    <div class="common-container-line">
      <h2 class="component-title">새 글 작성</h2>
      <div class="post-create-container">
        <div class="post-create-bar">
          <form @submit.prevent="createPost">
            <div class="input-row">
              <div class="input-wrapper title-wrapper">
                <label for="title" class="input-label">제목:</label>
                <input id="title" v-model="newPost.title" required>
              </div>
            </div>
            <div class="input-row">
              <div class="input-wrapper category-wrapper">
                <label for="category" class="input-label">카테고리:</label>
                <select id="category" v-model="newPost.category" required>
                  <option v-for="category in categories" :key="category" :value="category" class="selected-category">
                    {{ category }}
                  </option>
                </select>
              </div>
            </div>
            <div class="input-wrapper">
              <label for="content" class="input-label">내용:</label>
              <textarea id="content" v-model="newPost.content" required></textarea>
            </div>
            <div class="btn">
              <button type="submit" id="submit">글 등록</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import '@/assets/css/common_container.css'
import '@/assets/css/post_create.css';
import MainTop from '@/components/MainTop.vue';

import api from '@/services/api.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const categories = ['0-2세', '3-5세', '6-7세', '8-9세', '10-11세', '12-13세',]
const newPost = ref({
  title: '',
  author: '',
  content: '',
  category: ''
})

const createPost = async () => {
  try {
    await api.createCommunityPost(newPost.value)
    router.push('/community')
  } catch (error) {
    console.error('Error creating post:', error)
  }
}
</script>


<style scoped>
.input-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  width: 100%;
}

.input-wrapper {
  position: relative;
  flex: 1;
  margin-right: 10px;
}

.input-wrapper:last-child {

  margin-right: 0;
}

.title-wrapper {
  flex: 1;
}

.author-wrapper,
.category-wrapper {

  flex: 1;
}

.input-label {

  left: 15px;
  margin-right: 10px;
  top: 50%;

  color: #555555;
  font-size: 14px;
  pointer-events: none;
  z-index: 1;
  /* 라벨이 선택된 텍스트 위에 표시되도록 함 */
}

input,
select,
textarea {
  width: 100%;
  padding: 10px 15px 10px 70px;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 3px 7px #bebebe;
  font-size: 15px;
  background: white;
}


select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23555555" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  padding: 10px 35px 10px 80px;
  /* 오른쪽 패딩을 늘리고 왼쪽 패딩도 약간 증가 */
  text-indent: 10px;
  /* 선택된 텍스트를 오른쪽으로 밀기 */
}

/* 선택된 옵션의 스타일 */
select option:checked {
  font-weight: bold;
  color: #333;
}

/* 카테고리 드롭다운의 옵션 스타일 */
.selected-category {
  padding-left: 10px;
  /* 옵션 텍스트를 오른쪽으로 밀기 */
}
</style>