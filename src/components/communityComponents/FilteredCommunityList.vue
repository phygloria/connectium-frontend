<template>
    <MainTop />
    <div class="common-container">
        <div class="common-container-line">
            <div class="filtered-community-list">
                <h1>{{ category }} 커뮤니티</h1>
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
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';
import MainTop from '../MainTop.vue';


const route = useRoute();
const category = computed(() => route.params.category);
const posts = ref([]);

const fetchPosts = async () => {
    try {
        const response = await api.getAllCommunityPosts();
        posts.value = response;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

const filteredPosts = computed(() => {
    return posts.value.filter(post => post.category === category.value);
});

onMounted(fetchPosts);
</script>

<style scoped>
/* 여기에 필요한 스타일을 추가하세요 */
</style>