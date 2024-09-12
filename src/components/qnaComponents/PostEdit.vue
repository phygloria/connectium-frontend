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
        post: null
      };
    },
    created() {
      this.fetchPost(); //  현재 게시글의 데이터를 서버로부터 가져오는 역할
    },
    methods: {
      async fetchPost() {
        try {
          this.post = await api.getPostById(this.$route.params.id);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      },
      async updatePost() {
        try {
          await api.updatePost(this.$route.params.id, this.post);
          this.$router.push('/postList');
        } catch (error) {
          console.error('Error updating post:', error);
        }
      }
    }
  };
  </script>