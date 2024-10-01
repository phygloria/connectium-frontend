<template>
    <div class="common-container">
      <div class="common-container-line">
        <div class="content-list-container">
          <div class="content-list-warpper">
            <div class="title-container">
              <div class="title-bar">
                <h1 class="title">돌봄 서비스</h1>
                <h5 class="sub-title">우리 아이를 위한 돌봄 서비스</h5>
  
                <div v-if="isLoading" class="loading">
                  <h5>데이터를 불러오는 중...</h5>
                </div>
  
                <div v-else-if="error" class="error">{{ error }}</div>
  
                <div class="list-container">
                  <div class="list-column">
                    <div class="list-in-column">
                      <div class="list-card" v-for="content in cares" 
                      :key="content.id"
                        @click="navigateToDetail(content)"
                      >
  
                        <div class="img-area">
                          <img :src="getImageUrl(content.imagePath)" 
                          :alt="content.name" 
                          @error="handleImageError"
                          class="care-image" 
                          />
                        </div>
  
                        <div class="content-info-box">
                          <div class="content-info-area">
                            <div class="content-info">
                              <h3 class="content-title">{{ content.name }}</h3>
                              <p class="content-date">주소: {{ content.address }}</p>
                              <p class="content-target">연락처: {{ content.phoneNumber }}</p>
                              <p class="content-cost">비용: {{ content.usageFee || '무료' }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
  import '@/assets/css/contents_list.css';
  
  import api from '@/services/api';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const cares = ref([]);
  const isLoading = ref(true);
  const error = ref(null);
  
  const fetchCares = async () => {
    try {
      const response = await api.getAllCares();
      cares.value = response;
      isLoading.value = false;
    } catch (error) {
      console.error('Error fetching cares:', error);
      error.value = '데이터를 불러오는 데 실패했습니다.';
      isLoading.value = false;
    }
  };
  
  const getImageUrl = (imagePath) => {
  if (!imagePath) return '/path/to/default/image.jpg';
  return api.getCareImageUrl(imagePath);
};
  
  const navigateToDetail = (content) => {
    router.push(`/care/${content.id}`);
  };
  
  const handleImageError = (event) => {
    event.target.src = '/path/to/default/image.jpg';
  };
  
  onMounted(fetchCares);
  </script>
  
  <style scoped>
  .img-area {
      flex: 0 0 250px;
      height: 150px;
      background: #e2e2e2;
      border-radius: 10px;
      left: -70px;
      top: -25px;
      margin-right: 20px;
  }
  
  @media (max-width: 768px) {
    .img-area {
      height: 250px;
    }
  }
  </style>