<template>

  <MainTop />

  <div class="common-container">
    <div class="common-container-line">

      <div class="post-edit-container">
        <h2 class="edit-title">게시글 수정</h2>
        <form @submit.prevent="updatePost" v-if="post" class="edit-form">
          <div class="form-group">
            <label for="title">제목:</label>
            <input id="title" v-model="post.title" required class="form-input">
          </div>
          <!-- <div class="form-group">
            <label for="author">글쓴이:</label>
            <input id="author" v-model="post.author" required class="form-input">
          </div> -->
          <div class="form-group">
            <label for="content">내용:</label>
            <textarea id="content" v-model="post.content" required class="form-textarea"></textarea>
          </div>
          <div class="form-group">
            <label for="image" class="file-label">이미지 선택</label>
            <input type="file" id="image" @change="onFileChange" class="file-input">
            <span class="file-name">{{ fileName }}</span>
          </div>
          <button type="submit" class="submit-button">게시글 수정</button>
        </form>
      </div>
    </div>
  </div>
</template>



<script setup>
import '@/assets/css/post_edit.css';
import MainTop from '@/components/MainTop.vue';

import api from '@/services/api';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const post = ref(null);
const file = ref(null);
const fileName = ref('');

const fetchPost = async () => {
  try {
    const data = await api.getPostById(route.params.id);
    post.value = data;
  } catch (error) {
    console.error('Error fetching post:', error);
  }
};

const onFileChange = (e) => {
  file.value = e.target.files[0];
  fileName.value = file.value ? file.value.name : '';
};

const updatePost = async () => {
  try {
    const formData = new FormData();
    formData.append('title', post.value.title);
    formData.append('content', post.value.content);
    formData.append('author', post.value.author);
    if (file.value) {
      formData.append('image', file.value);
    }

    const response = await api.updatePost(route.params.id, formData);
    if (response) {
      router.push('/postList');
    }
  } catch (error) {
    console.error('Error updating post:', error);
  }
};

onMounted(fetchPost);
</script>

<!-- <template>
  <MainTop />
  <div v-if="post" class="edit-container">
    <h1>글 수정하기</h1>
    <form @submit.prevent="updatePost">
      <div>
        <label for="title">제목:</label>
        <input type="text" id="title" v-model="post.title" required>
      </div>
      <div>
        <label for="content">내용:</label>
        <textarea id="content" v-model="post.content" required></textarea>
      </div>
      <div>
        <label for="author">작성자:</label>
        <input type="text" id="author" v-model="post.author" required>
      </div>
      <div>
        <label for="image">이미지:</label>
        <input type="file" id="image" @change="onFileChange" accept="image/*">
        <span v-if="fileName">{{ fileName }}</span>
      </div>
      <button type="submit">수정하기</button>
    </form>
  </div>
</template> -->