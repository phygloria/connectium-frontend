<template>

<MainTop />

    <div class="common-container">
        <div class="common-container-line">
            <div class="commponent-title">
                <h1 class="community-title">5세 미만</h1>
                <p class="community-subtitle">0세부터 4세까지 영유아 육아이야기 나눠요~!</p>
            </div>
            <div class="post-btn">
            <router-link to="/community/create" class="create-post-button">글쓰기</router-link>
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
                        <span class="post-author">{{ post.authorName }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

import '@/assets/css/common_container.css'
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api';
import MainTop from '@/components/MainTop.vue'

const posts = ref([])

const fetchPosts = async () => {
  try {
    const response = await api.getAllCommunityPosts()
    posts.value = response
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}



const filterFunctions = {
  '5세미만': post => post.category === '5세미만',
};


const filteredPosts = computed(() => {
  const filterFunction = filterFunctions.value || filterFunctions.all;
  return posts.value.filter(filterFunction);
});

onMounted(fetchPosts)

</script>

<style scoped></style>