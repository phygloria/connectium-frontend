<template>

  <MainTop />
  
  <div class="common-container">
    <div class="common-container-line">
      <div class="post-detail-container">
        <div v-if="post" class="post-content">
          <div class="post-header">
            <h2 class="post-title">{{ post.title }}</h2>
            <div class="post-info">
              <p class="post-view-count">조회수: {{ post.viewCount }}</p>
              <p class="post-author">작성자: {{ post.author }}</p>
            </div>
          </div>
          <div v-if="post.imagePath" class="image-container">
            <img :src="getImageUrl(post.imagePath)" :alt="post.title" class="post-image">
          </div>
          <div class="post-body">
            <p class="post-text">{{ post.content }}</p>
          </div>
          <div class="post-actions">
            <router-link :to="`/post/${post.id}/edit`" class="action-button edit">수정</router-link>
            <button @click="deletePost" class="action-button delete">삭제</button>
            <router-link to="/postList" class="action-button back">목록으로 돌아가기</router-link>
          </div>
        </div>

        <div class="comments-section">
          <h5 class="comments-title">댓글</h5>
          <div class="new-comment-form">
            <textarea v-model="newCommentContent" placeholder="댓글을 입력하세요..."></textarea>
            <button @click="addComment" class="add-comment">댓글 추가</button>
          </div>
          <div v-for="comment in comments" :key="comment.id" class="comment">
            <div class="comment-content">
              <strong>{{ comment.author }}</strong>
              <p>{{ comment.content }}</p>
              <div class="reply-content">
                <button @click="showReplyForm(comment.id)" class="reply-button">답글</button>
              </div>
            </div>

            <div v-if="replyingTo === comment.id" class="reply-form">
              <textarea v-model="replyContent" placeholder="답글을 입력하세요..."></textarea>
              <button @click="addReply(comment.id)">답글 추가</button>
            </div>

            <div v-if="comment.replies && comment.replies.length > 0" class="replies">
              <div v-for="reply in comment.replies" :key="reply.id" class="reply">
                <strong>{{ reply.author }}</strong>
                <p>{{ reply.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<script setup>
import '@/assets/css/common_container.css';
import '@/assets/css/post_view.css';
import '@/assets/css/post_comment.css';
import MainTop from '@/components/MainTop.vue';

import api from '@/services/api';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const post = ref(null);
const comments = ref([]);
const newCommentContent = ref('');
const replyContent = ref('');
const replyingTo = ref(null);

const getImageUrl = computed(() => {
  return (imagePath) => {
    if (imagePath) {
      return `http://localhost:8080${imagePath}`;
    }
    return '';
  };
});

const fetchPost = async () => {
  try {
    post.value = await api.getPostById(route.params.id);
    console.log('Fetched post:', post.value);
  } catch (error) {
    console.error('Error fetching post:', error);
  }
};

const fetchComments = async () => {
  try {
    comments.value = await api.getCommentsByPostId(route.params.id);
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

const deletePost = async () => {
  try {
    await api.deletePost(route.params.id);
    router.push('/');
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

const addComment = async () => {
  try {
    const newComment = await api.addComment({
      postId: route.params.id,
      content: newCommentContent.value
    });
    comments.value = [newComment, ...comments.value];
    newCommentContent.value = '';
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};

const showReplyForm = (commentId) => {
  replyingTo.value = commentId;
};

const addReply = async (parentId) => {
  try {
    const newReply = await api.addComment({
      postId: route.params.id,
      content: replyContent.value,
      parentId: parentId
    });
    const parentComment = comments.value.find(c => c.id === parentId);
    if (parentComment) {
      if (!parentComment.replies) {
        parentComment.replies = [];
      }
      parentComment.replies.push(newReply);
    }
    replyContent.value = '';
    replyingTo.value = null;
  } catch (error) {
    console.error('Error adding reply:', error);
  }
};

onMounted(() => {
  fetchPost();
  fetchComments();
});
</script>






