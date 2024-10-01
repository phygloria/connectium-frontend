<template>

  <MainTop />

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
                  :src="getEducationImage(content.imagePath)" 
                  :alt="content.name"
                  @error="handleImageError" 
                  ref="imageRef">
                  
                </div>
              </div>
              <div class="info-container">
                <div class="action-buttons">
                  <!-- <button class="map-button">지도보기</button> -->
                  <button class="bookmark-button" @click="toggleBookmark">
                    <img :src="isBookmarked ? bookmarkIcon : starIcon" :alt="isBookmarked ? '북마크 제거' : '북마크 추가'"
                      :class="isBookmarked ? 'bookmark-icon' : 'star-icon'" />
                  </button>
                </div>
                <div class="info-item">
                  <span class="label">접수기간 :</span>
                  <span class="value">{{ content.registrationPeriod }}</span>
                </div>
                <div class="info-item">
                  <span class="label">대상 :</span>
                  <span class="value">{{ content.targetAudience }}</span>
                </div>
                <div class="info-item">
                  <span class="label">장소 :</span>
                  <span class="value">{{ content.location }}</span>
                </div>
                <div class="info-item">
                  <span class="label">비용 :</span>
                  <span class="value">{{ content.cost || '무료' }}</span>
                </div>
                <div class="info-item">
                  <span class="label">교육기간 :</span>
                  <span class="value">{{ content.educationPeriod }}</span>
                </div>
                <div class="info-item">
                  <span class="label">문의처 :</span>
                  <span class="value">{{ content.phoneNumber }}</span>
                </div>
              </div>
            </div>
            <div class="map-container">
              <div id="kakao-map" style="width:100%;height:400px;"></div>
            </div>
            <ReviewSection :itemId="content.id.toString()" itemType="EDUCATION" />
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
import MainTop from '@/components/MainTop.vue';
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
    const response = await api.getEducationById(route.params.id);
    content.value = response;
    await checkBookmarkStatus();
    // initMap();  // 콘텐츠를 가져온 후 지도 초기화
  } catch (err) {
    console.error('Error fetching education content detail:', err);
    error.value = '교육 프로그램 정보를 불러오는 데 실패했습니다.';
  }
};

const checkBookmarkStatus = async () => {
  try {
    const bookmarks = await api.getBookmarks();
    isBookmarked.value = bookmarks.some(bookmark =>
      bookmark.itemId === content.value.id.toString() && bookmark.itemType === 'EDUCATION'
    );
  } catch (err) {
    console.error('Error checking bookmark status:', err);
  }
};

const toggleBookmark = async () => {
  try {
    await api.toggleBookmark({
      itemId: content.value.id.toString(),
      itemType: 'EDUCATION'
    });
    isBookmarked.value = !isBookmarked.value;
  } catch (err) {
    console.error('Error toggling bookmark:', err);
  }
};

const getEducationImage = (imagePath) => {
  if (!imagePath) return '/path/to/default/image.jpg';  // 기본 이미지 경로
  const imageName = imagePath.split('/').pop(); // 파일 이름만 추출
  return api.getEducationImageUrl(imageName);
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



const initMap = () => {
  if (window.kakao && window.kakao.maps && content.value) {
    const container = document.getElementById('kakao-map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 중심 좌표
      level: 3
    };
    const map = new window.kakao.maps.Map(container, options);

    // 주소로 좌표 검색
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(content.value.location, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: coords
        });

        // 인포윈도우 생성
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="width:200px;text-align:center;padding:6px 0;">${content.value.name}</div>`
        });

        // 마커에 마우스오버 이벤트 추가
        window.kakao.maps.event.addListener(marker, 'mouseover', function () {
          infowindow.open(map, marker);
        });

        // 마커에 마우스아웃 이벤트 추가
        window.kakao.maps.event.addListener(marker, 'mouseout', function () {
          infowindow.close();
        });

        // 지도 중심을 마커 위치로 이동
        map.setCenter(coords);
      }
    });
  }
};

onMounted(fetchContentDetail);
</script>

<style scoped>
.content-detail-container {
  align-items: center;
  justify-content: center;
  /* display: flex; */
  width: 70%; /* 화면 너비의 90%로 확장 */
}
.content-detail-warpper {
  display: inline;
  width: 100%; /* 화면 너비의 90%로 확장 */
  align-items: center;
  justify-content: center;
}

.map-container {
  margin-top: 20px;
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
}

#kakao-map {
  width: 100%;
  height: 100%;
}
</style>