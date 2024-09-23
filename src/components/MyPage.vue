<template>
    <div class="common-container">
      <div class="common-container-line">
        <h2>내 북마크</h2>
        <div v-if="isLoading" class="loading">데이터를 불러오는 중...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="list-container">
          <div class="list-column">
            <div class="list-in-column">
              <div class="list-card" v-for="bookmark in bookmarks" :key="bookmark.itemId" @click="navigateToDetail(bookmark)">
                <div class="img-area">
                  <img :src="getImageUrl(bookmark)" :alt="bookmark.name" />
                </div>
                <div class="content-info-box">
                  <div class="content-info-area">
                    <div class="content-info">
                      <h3 class="content-name">{{ bookmark.name }}</h3>
                      <p v-if="bookmark.itemType === 'OUTDOOR'" class="content-address">{{ bookmark.address }}</p>
                      <p v-if="bookmark.itemType === 'OUTDOOR'" class="content-feature">{{ bookmark.feature }}</p>
                      <p v-if="bookmark.itemType === 'EDUCATION'" class="content-registration">접수기간: {{ bookmark.registrationPeriod }}</p>
                      <p v-if="bookmark.itemType === 'EDUCATION'" class="content-target">대상: {{ bookmark.targetAudience }}</p>
                      <p v-if="bookmark.itemType === 'PROGRAM1' || bookmark.itemType === 'PROGRAM2'" class="content-location">{{ bookmark.placenm }}</p>
                      <p v-if="bookmark.itemType === 'PROGRAM1' || bookmark.itemType === 'PROGRAM2'" class="content-date">{{ formatDate(bookmark.svcopnbgndt) }}</p>
                      <p class="content-cost">{{ getCostDisplay(bookmark) }}</p>
                    </div>
                  </div>
                </div>
                <button @click.stop="removeBookmark(bookmark.itemId, bookmark.itemType)">북마크 제거</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import api from '@/services/api';
  
  const router = useRouter();
  const bookmarks = ref([]);
  const isLoading = ref(true);
  const error = ref(null);
  
  const fetchBookmarks = async () => {
    try {
      isLoading.value = true;
      const response = await api.getBookmarks();
      bookmarks.value = response;
      isLoading.value = false;
    } catch (err) {
      console.error('북마크를 불러오는 데 실패했습니다:', err);
      error.value = '북마크를 불러오는 데 실패했습니다.';
      isLoading.value = false;
    }
  };
  
  const getImageUrl = (bookmark) => {
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
  };
  
  const getCostDisplay = (bookmark) => {
    switch(bookmark.itemType) {
      case 'OUTDOOR':
        return `입장료: ${bookmark.ent_fee || '무료'}`;
      case 'EDUCATION':
        return `비용: ${bookmark.cost || '무료'}`;
      case 'PROGRAM1':
      case 'PROGRAM2':
        return `가격: ${bookmark.payatnm}`;
      default:
        return '';
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  const removeBookmark = async (itemId, itemType) => {
    try {
      await api.toggleBookmark({ itemId, itemType });
      await fetchBookmarks(); // 북마크 목록 새로고침
    } catch (error) {
      console.error('북마크 제거에 실패했습니다:', error);
    }
  };
  
  const navigateToDetail = (bookmark) => {
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
      default:
        console.error('Unknown item type:', bookmark.itemType);
    }
  };
  
  onMounted(fetchBookmarks);
  </script>
  
  