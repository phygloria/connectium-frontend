<template>
    <div class="review-section">
      <h3>리뷰</h3>
      <div v-if="reviews.length" class="reviews-list">
        <div v-for="review in reviews" :key="review.id" class="review-item">
          <p><strong>{{ review.userName }}</strong> - {{ formatDate(review.createdAt) }}</p>
          <p>{{ review.content }}</p>
        </div>
      </div>
      <div v-else>아직 리뷰가 없습니다.</div>
      
      <h3 class="review-write">리뷰 작성</h3>
      <div v-if="isLoggedIn">
        <textarea v-model="newReview" placeholder="리뷰를 작성해주세요" rows="4"></textarea>
        <button @click="submitReview" :disabled="!newReview.trim()">리뷰 등록</button>
      </div>
      <div v-else>
        리뷰를 작성하려면 <a href="/login">로그인</a>이 필요합니다.
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import api from '@/services/api';
  
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
  .review-section {
    margin-top: 20px;
  }
  
  .reviews-list {
    margin-bottom: 20px;
  }
  
  .review-item {
    border-bottom: 1px solid #eee;
    padding: 10px 0;
  }
  
  textarea {
    width: 100%;
    margin-bottom: 10px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #cccccc;
  }
  </style>