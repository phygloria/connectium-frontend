<template>
  <div>
    <h2>게시글 수정</h2>
    <form @submit.prevent="updatePost" v-if="post">
      <div>
        <label for="title">제목:</label>
        <input id="title" v-model="post.title" required>
      </div>
      <div>
        <label for="author">글쓴이:</label>
        <input id="author" v-model="post.author" required>
      </div>
      <div>
        <label for="content">내용:</label>
        <textarea id="content" v-model="post.content" required></textarea>
      </div>
      <div>
        <label for="image">이미지:</label>
        <input type="file" id="image" @change="onFileChange">
      </div>
      <button type="submit">게시글 수정</button>
    </form>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'PostEdit',
  data() {
    return {
      post: null,
      file: null
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