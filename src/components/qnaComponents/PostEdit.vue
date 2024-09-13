<template>
  <div class="post-edit-container">
    <h2 class="edit-title">게시글 수정</h2>
    <form @submit.prevent="updatePost" v-if="post" class="edit-form">
      <div class="form-group">
        <label for="title">제목:</label>
        <input id="title" v-model="post.title" required class="form-input">
      </div>
      <div class="form-group">
        <label for="author">글쓴이:</label>
        <input id="author" v-model="post.author" required class="form-input">
      </div>
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
</template>

<script>
import '@/assets/css/edit.css'
import api from '@/services/api';

export default {
  name: 'PostEdit',
  data() {
    return {
      post: null,
      file: null,
      fileName: ''
    };
  },
  created() {
    this.fetchPost();
  },
  methods: {
    async fetchPost() {
      try {
        const data = await api.getPostById(this.$route.params.id);
        this.post = data;
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    },
    onFileChange(e) {
      this.file = e.target.files[0];
      this.fileName = this.file ? this.file.name : '';
    },
    async updatePost() {
      try {
        const formData = new FormData();
        formData.append('title', this.post.title);
        formData.append('content', this.post.content);
        formData.append('author', this.post.author);
        if (this.file) {
          formData.append('image', this.file);
        }
        
        const response = await api.updatePost(this.$route.params.id, formData);
        if (response) {
          this.$router.push('/postList');
        }
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
  }
};
</script>
