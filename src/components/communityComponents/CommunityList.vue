<template>

  <MainTop />

  <div class="common-container">
    <div class="common-container-line">
      <div class="commponent-list">
        <div class="commponent-list-wrapper">
          <div class="commponent-title">
            <h1 class="community-title">우리아이 커뮤니티</h1>
            <p class="community-subtitle">우리아이를 돌아보세요!</p>
          </div>
          <div class="post-btn">
            <router-link to="/community/create" class="create-post-button">글쓰기</router-link>
          </div>
          <div class="content-wrapper">
            <div class="category-buttons">
              <router-link v-for="category in categories" :key="category.value"
                :to="{ name: 'FilteredCommunity', params: { category: category.value } }" custom
                v-slot="{ navigate, isActive }">
                <button @click="navigate" :class="{ active: isActive }">
                  {{ category.label }}
                </button>
              </router-link>
            </div>

          </div>
        </div>

        <div class="list-wrapper">
          <div class="post-list">
            <div v-for="post in filteredPosts" :key="post.id" class="post-item">
              <router-link :to="`/community/${post.id}`">
                <h3 class="post-title">{{ post.title }}</h3>
              </router-link>
              <div class="post-item-wrapper">
                <span class="post-category">{{ post.category }}</span>
                <div class="list-ediNdelNcount">
                  <span class="post-view-count">조회수: {{ post.viewCount }}</span>
                  <span class="post-author">{{ post.authorName }}</span>
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
import '@/assets/css/community_list.css'
import '@/assets/css/common_container.css'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api';
import MainTop from '@/components/MainTop.vue'

const route = useRoute()

const posts = ref([])

const categories = [
  { value: '5세미만', label: '5세미만' },
  { value: '5세~6세', label: '5세~6세' },
  { value: '7세~9세', label: '7세~9세' },
  { value: '10세이상', label: '10세이상' }
];

const fetchPosts = async () => {
  try {
    const response = await api.getAllCommunityPosts()
    posts.value = response
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}

const filteredPosts = computed(() => {
  const category = route.params.category;
  if (category) {
    return posts.value.filter(post => post.category === category);
  }
  return posts.value;
});

onMounted(async () => {
  await fetchPosts();
})
</script>
