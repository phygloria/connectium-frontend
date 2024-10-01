<template>
    <div class="common-container">
      <div class="common-container-line">
        <div class="content-detail-container">
          <div class="content-detail-warpper">
            <div v-if="content" class="content-detail">
              <h2 class="service-name">{{ content.name }}</h2>
              <div class="content-wrapper">
                <div class="image-container">
                  <div class="detail-img-area">
                    <img 
                    :src="getCareImage(content.imagePath)" 
                    :alt="content.name"
                    @error="handleImageError" 
                    ref="imageRef">
                  </div>
                </div>
                <div class="info-container">
                  <div class="action-buttons">
                    <button class="bookmark-button" @click="toggleBookmark">
                      <img :src="isBookmarked ? bookmarkIcon : starIcon" :alt="isBookmarked ? '북마크 제거' : '북마크 추가'"
                        :class="isBookmarked ? 'bookmark-icon' : 'star-icon'" />
                    </button>
                  </div>
                  <div class="info-item">
                    <span class="label">주소 :</span>
                    <span class="value">{{ content.address }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">연락처 :</span>
                    <span class="value">{{ content.phoneNumber }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">소개 :</span>
                    <span class="value">{{ content.introduction }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">운영시간 :</span>
                    <span class="value">{{ content.operatingHours }}</span>
                  </div>
                  <div class="info-item">
                    <span class="label">이용료 :</span>
                    <span class="value">{{ content.usageFee || '무료'}}</span>
                  </div>
                </div>
              </div>
              <ReviewSection :itemId="content.id.toString()" itemType="CARE" />
            </div>
            <div v-else-if="error" class="error-message">
              {{ error }}
            </div>
            <div v-else>Loading...</div>
          </div>
        </div>
        <div class="background-image"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import '@/assets/css/common_container.css';
  import '@/assets/css/contents_detail.css';
  import bookmarkIcon from '@/assets/images/icon/book-mark.png';
  import starIcon from '@/assets/images/icon/star.png';
  import ReviewSection from '@/components/ReviewSection.vue';
  
  import api from '@/services/api';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const content = ref(null);
  const error = ref(null);
  const isBookmarked = ref(false);
  const imageRef = ref(null);
  
  const fetchContentDetail = async () => {
    try {
      const response = await api.getCareById(route.params.id);
      content.value = response;
      await checkBookmarkStatus();
    } catch (err) {
      console.error('Error fetching care content detail:', err);
      error.value = '돌봄 서비스 정보를 불러오는 데 실패했습니다.';
    }
  };
  
  const checkBookmarkStatus = async () => {
    try {
      const bookmarks = await api.getBookmarks();
      isBookmarked.value = bookmarks.some(bookmark =>
        bookmark.itemId === content.value.id.toString() && bookmark.itemType === 'CARE'
      );
    } catch (err) {
      console.error('Error checking bookmark status:', err);
    }
  };
  
  const toggleBookmark = async () => {
    try {
      await api.toggleBookmark({
        itemId: content.value.id.toString(),
        itemType: 'CARE'
      });
      isBookmarked.value = !isBookmarked.value;
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    }
  };
  
  const getCareImage = (imagePath) => {
  if (!imagePath) return '/path/to/default/image.jpg';
  return api.getCareImageUrl(imagePath);
};
  
  const handleImageError = () => {
    if (imageRef.value) {
      imageRef.value.style.display = 'none';
      const parent = imageRef.value.parentNode;
      const placeholder = document.createElement('div');
      placeholder.className = 'image-placeholder';
      placeholder.textContent = '이미지를 불러올 수 없습니다';
      placeholder.style.width = '100%';
      placeholder.style.height = '200px';
      placeholder.style.backgroundColor = 'rgba(215,230,244,0.1)';
      placeholder.style.display = 'flex';
      placeholder.style.alignItems = 'center';
      placeholder.style.justifyContent = 'center';
      placeholder.style.color = '#666';
      placeholder.style.fontSize = '14px';
      parent.appendChild(placeholder);
    }
  };
  
  onMounted(fetchContentDetail);
  </script>
  
  <style scoped>
  .content-detail-container {
    align-items: center;
    justify-content: center;
    width: 70%;
  }
  .content-detail-warpper {
    display: inline;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  </style>