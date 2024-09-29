<template>
  <div class="common-container">
    <div class="common-container-line">
      <div class="content-list-container">
        <div class="content-list-warpper">
          <div class="title-container">
            <div class="title-bar">
              <h1 class="title">가을하늘에는 파란하늘을 보며!</h1>
              <h5 class="sub-title">중랑구 가을나들이 가기 좋은 곳</h5>
              <div class="filter-bar">
                <div class="filters">
                  <button 
                    v-for="filter in filters" 
                    :key="filter.value" 
                    @click="activeFilter = filter.value" 
                    :class="{
                      active: activeFilter === filter.value,
                      'education-program': filter.label === '교육프로그램'
                    }"
                  >
                    {{ filter.label }}
                  </button>
                </div>
              </div>

              <div v-if="isLoading" class="loading">
                <h5>데이터를 불러오는 중...</h5>
              </div>

              <div v-else-if="error" class="error">{{ error }}</div>

              <div class="list-container">
                <div class="list-column">
                  <div class="list-in-column">
                    <div 
                      class="list-card" 
                      v-for="content in filteredEvents" 
                      :key="content.id"
                      @click="navigateToDetail(content)"
                    >
                      <div class="img-area">
                        <img 
                          :src="getImageUrl(content.imgurl)" 
                          :alt="content.title || content.svcnm" 
                          @error="handleImageError"
                        />
                      </div>
                      <div class="content-info-box">
                        <div class="content-info-area">
                          <div class="content-info">
                            <h3 class="content-title">{{ content.title || content.svcnm }}</h3>
                            <p class="content-location">{{ content.location || content.placenm }}</p>
                            <p class="content-date">{{ formatDate(content.date || content.svcopnbgndt) }}</p>
                            <div class="content-status">
                              <span :class="['status', content.status || content.svcstatnm]">
                                {{ content.status || content.svcstatnm }}
                              </span>
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
  </div>
</template>

<script setup>
import '@/assets/css/common_container.css';
import '@/assets/css/contents_list.css';

import api from '@/services/api';
import { ref, reactive, computed, onMounted } from 'vue';
import { useAllPrograms } from '@/composables/useAllPrograms';
import { useRouter } from 'vue-router';

const router = useRouter();
const { programs, isLoading, error, fetchPrograms } = useAllPrograms();

const activeFilter = ref('all');

const filters = reactive([
  { value: 'all', label: '전체보기' },
  { value: 'culture', label: '문화행사' },
  { value: 'free', label: '무료' },
  { value: 'paid', label: '유료' }
]);

const filterFunctions = {
  all: () => true,
  culture: content => content.type === 'program1',
  free: content => content.payatnm === '무료',
  paid: content => content.payatnm === '유료'
};

const filteredEvents = computed(() => {
  if (!programs.value) return [];
  const filterFn = filterFunctions[activeFilter.value] || filterFunctions['all'];
  return programs.value.filter(filterFn);
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch (error) {
    console.error('Invalid date:', dateString);
    return dateString;
  }
};

const getImageUrl = (filename) => {
  if (!filename) return '';
  const cleanFilename = filename.replace('/HOMEPAGE/PROGRAM/IN/', '');
  return api.getProxyImageUrl(cleanFilename);
};

const handleImageError = (event) => {
  const imgElement = event.target;
  const parent = imgElement.parentNode;
  
  parent.removeChild(imgElement);
  
  const textElement = document.createElement('div');
  textElement.textContent = '이미지를 불러올 수 없습니다';
  textElement.style.width = '100%';
  textElement.style.height = '100%';
  textElement.style.display = 'flex';
  textElement.style.alignItems = 'center';
  textElement.style.justifyContent = 'center';
  textElement.style.backgroundColor = 'rgba(225,225,225,0.3);';
  textElement.style.color = '#666';
  textElement.style.fontSize = '14px';
  
  parent.appendChild(textElement);
};

const navigateToDetail = (content) => {
  router.push({
    name: 'programDetail',
    params: {
      type: content.type === 'program1' ? 'CulProgram' : 'EduProgram',
      svcid: content.svcid
    }
  });
};

onMounted(async () => {
  await fetchPrograms();
});
</script>


<style scoped>

</style>