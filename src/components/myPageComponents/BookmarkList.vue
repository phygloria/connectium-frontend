<template>
    <div class="bookmark-list">
      <div v-for="bookmark in bookmarks" :key="bookmark.itemId" class="bookmark-item">
        <div class="bookmark-content" @click="navigateToDetail(bookmark)">
          <img :src="getImageUrl(bookmark)" :alt="bookmark.name" class="bookmark-image" />
          <div class="bookmark-info">
            <h3>{{ bookmark.name }}</h3>
            <p v-if="bookmark.itemType === 'OUTDOOR'">{{ bookmark.address }}</p>
            <p v-if="bookmark.itemType === 'EDUCATION'">접수기간: {{ bookmark.registrationPeriod }}</p>
            <p v-if="['PROGRAM1', 'PROGRAM2'].includes(bookmark.itemType)">{{ formatDate(bookmark.svcopnbgndt) }}</p>
          </div>
        </div>
        <button @click="emit('removeBookmark', bookmark.itemId, bookmark.itemType)" class="remove-btn">삭제</button>
      </div>
    </div>
  </template>
  
  <script setup>
import { useRouter } from 'vue-router';
import api from '@/services/api';

defineProps(['bookmarks']);
const emit = defineEmits(['removeBookmark']);

const router = useRouter();

function getImageUrl(bookmark) {
  switch(bookmark.itemType) {
    case 'OUTDOOR':
      return api.getParkImage(bookmark.imagePath);
    case 'EDUCATION':
      return api.getEducationImageUrl(bookmark.imagePath);
    case 'PROGRAM1':
    case 'PROGRAM2':
      return api.getProxyImageUrl(bookmark.imagePath);
    default:
      return '';
  }
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function navigateToDetail(bookmark) {
  switch(bookmark.itemType) {
    case 'OUTDOOR':
      router.push(`/outdoor/park/${bookmark.itemId}`);
      break;
    case 'EDUCATION':
      router.push(`/education/${bookmark.itemId}`);
      break;
    case 'PROGRAM1':
    case 'PROGRAM2':
      router.push({
        name: 'programDetail',
        params: {
          type: bookmark.itemType === 'PROGRAM1' ? 'CulProgram' : 'EduProgram',
          svcid: bookmark.itemId
        }
      });
      break;
  }
}
</script>
  
  <style scoped>
  .bookmark-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .bookmark-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 8px;
  }
  
  .bookmark-content {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
  
  .bookmark-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .bookmark-info {
    flex: 1;
  }
  
  .bookmark-info h3 {
    margin: 0;
    font-size: 16px;
  }
  
  .bookmark-info p {
    margin: 5px 0 0;
    font-size: 14px;
    color: #666;
  }
  
  .remove-btn {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>