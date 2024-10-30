<!-- CommunityDetail -->
<template>
  <div> <!-- 루트 요소로 전체 감싸기 -->
    <MainTop />
    <div class="common-container">
      <div class="common-container-line">
        <div class="post-detail-container">
          <div v-if="post" class="post-content">
            <div class="post-header">
              <h2>{{ post.title }}</h2>
              <p>작성자: {{ post.author }}</p>
              <p>카테고리: {{ post.category }}</p>
            </div>
            <div class="post-body">
              <div class="post-text">{{ post.content }}</div>
            </div>
            <div class="post-actions">
              <router-link :to="`/community/edit/${post.id}`" class="action-button edit">수정</router-link>
              <button @click="deletePost" class="action-button delete">삭제</button>
              <router-link to="/community" class="action-button back">목록으로 돌아가기</router-link>
            </div>
          </div>
          <!-- 댓글 섹션 -->
          <div class="comments-section">
            <h5 class="comments-title">댓글</h5>
            <div class="new-comment-form">
              <textarea v-model="newCommentContent" placeholder="댓글을 입력하세요..."></textarea>
              <button @click="addComment" class="add-comment">댓글 추가</button>
            </div>
            <!-- 댓글 표시 -->
            <div v-for="comment in comments" :key="comment.id" class="comment">
              <div class="comment-content">
                <strong>{{ comment.author }}</strong>
                <p>{{ comment.content }}</p>
                <button @click="showReplyForm(comment.id)" class="reply-button">답글</button>
              </div>
              <!-- 답글 폼 표시 -->
              <div v-if="replyingTo === comment.id" class="reply-form">
                <textarea v-model="replyContent" placeholder="답글을 입력하세요..."></textarea>
                <button @click="addReply(comment.id)">답글 추가</button>
              </div>
              <!-- 답글 표시 -->
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
  </div> <!-- 루트 요소 끝 -->
</template>

<script setup>
import MainTop from '@/components/MainTop.vue'
import api from '@/services/api.js'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import '@/assets/css/post_comment.css';

const route = useRoute();
const router = useRouter();
const post = ref(null);
const comments = ref([]);
const newCommentContent = ref('');
const replyingTo = ref(null);
const replyContent = ref('');

const fetchPost = async () => {
  try {
    const response = await api.getCommunityPostById(route.params.id);
    post.value = response;
  } catch (error) {
    console.error('Error fetching post:', error);
  }
};

const deletePost = async () => {
  if (confirm('정말로 이 글을 삭제하시겠습니까?')) {
    try {
      await api.deleteCommunityPost(route.params.id);
      router.push('/community');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }
};

const fetchComments = async () => {
  try {
    comments.value = await api.getCommentsByCommunityId(route.params.id);
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

const addComment = async () => {
  try {
    const newComment = await api.addComment({
      communityId: route.params.id,
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
      communityId: route.params.id,
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

.post-text {
  color: #333;
  line-height: 1.6;
}


.post-body {
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.post-actions {
  margin-top: 20px;
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
</style>