<template>
  <div class="post-detail-container">
    <div v-if="post" class="post-content">
      <div class="post-header">
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-author">작성자: {{ post.author }}</p>
        <p class="post-view-count">조회수: {{ post.viewCount }}</p>
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
      <h3>댓글</h3>
      <div class="new-comment-form">
        <textarea v-model="newCommentContent" placeholder="댓글을 입력하세요..."></textarea>
        <button @click="addComment">댓글 추가</button>
      </div>
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment-content">
          <strong>{{ comment.author }}</strong>
          <p>{{ comment.content }}</p>
          <button @click="showReplyForm(comment.id)" class="reply-button">답글</button>
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
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';

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

<style scoped>
.post-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f8e3;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.post-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
}

.post-header {
  border-bottom: 2px solid #8ac007;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.post-title {
  color: #8ac007;
  font-size: 24px;
  margin-bottom: 10px;
}

.post-author {
  color: #666;
  font-size: 14px;
}

.image-container {
  margin: 20px 0;
  text-align: center;
}

.post-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-body {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.post-text {
  color: #333;
  line-height: 1.6;
}

.post-actions {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}

.action-button {
  padding: 8px 15px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

.action-button.edit {
  background-color: #8ac007;
  color: white;
}

.action-button.delete {
  background-color: #ff6b6b;
  color: white;
  border: none;
  cursor: pointer;
}

.action-button.back {
  background-color: #f0f8e3;
  color: #8ac007;
  border: 1px solid #8ac007;
}

.action-button:hover {
  opacity: 0.8;
}

/* 댓글 관련 스타일 */
.comments-section {
  margin-top: 30px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.new-comment-form, .reply-form {
  margin-bottom: 20px;
}

.new-comment-form textarea, .reply-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
  min-height: 60px;
  max-height: 150px;
}

.new-comment-form button, .reply-form button, .reply-button {
  margin-top: 5px;
  background-color: #8ac007;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.comment {
  border-bottom: 1px solid #e0e0e0;
  padding: 15px 0;
  margin-bottom: 15px;
}

.comment-content {
  margin-bottom: 10px;
}

.comment-content strong {
  font-size: 16px;
  color: #333;
}

.comment-content p {
  margin-top: 5px;
  color: #555;
}

.replies {
  margin-left: 20px;
  padding-left: 15px;
  border-left: 2px solid #8ac007;
}

.reply {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.reply strong {
  font-size: 14px;
  color: #444;
}

.reply p {
  margin-top: 5px;
  color: #666;
}

.reply-button {
  background-color: #f0f8e3;
  color: #8ac007;
  border: 1px solid #8ac007;
}

.reply-button:hover {
  background-color: #e5f2d0;
}
</style>