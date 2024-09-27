<template>
  <div class="review-section">
    <h3 class="review-top-title">리뷰</h3>
    <div v-if="reviews.length" class="reviews-list">
      <div v-for="review in reviews" :key="review.id" class="review-item">
        <div class="review-auth-date">
          <strong>{{ review.userName }}</strong>
          <strong class="review-content">{{ review.content }}</strong>
          <small>{{ formatDate(review.createdAt) }}</small>
        </div>
      </div>
    </div>
    <h3 v-else>아직 리뷰가 없습니다.</h3>

    <h3 class="review-write">리뷰 작성</h3>
    <div v-if="isLoggedIn">
      <textarea class="review-write-area" v-model="newReview" placeholder="리뷰를 작성해주세요" rows="4"></textarea>
      <button class="review-write-btn" @click="submitReview" :disabled="!newReview.trim()">리뷰 등록</button>
    </div>
    <h4 v-else>
      리뷰를 작성하려면 <a href="/login">로그인</a>이 필요합니다.
    </h4>
  </div>
</template>

<script setup>
import '@/assets/css/post_comment.css';
import '@/assets/css/review.css';

import api from '@/services/api';
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  itemId: {
    type: String,
    required: true
  },
  itemType: {
    type: String,
    required: true
  }
});

const reviews = ref([]);
const newReview = ref('');
const isLoggedIn = computed(() => !!localStorage.getItem('token'));

const fetchReviews = async () => {
  try {
    const response = await api.getReviews(props.itemType, props.itemId);
    reviews.value = response.data;
  } catch (error) {
    console.error('리뷰를 불러오는 데 실패했습니다:', error);
  }
};

const submitReview = async () => {
  if (!newReview.value.trim()) return;

  try {
    await api.postReview(props.itemType, props.itemId, newReview.value);
    newReview.value = '';
    await fetchReviews();
  } catch (error) {
    console.error('리뷰 등록에 실패했습니다:', error);
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ko-KR');
};

onMounted(fetchReviews);
</script>





<style scoped>

.review-write-area {
  padding: 2%;
}

</style>
