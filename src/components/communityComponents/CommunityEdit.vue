<!-- CommunityEdit -->
<template>

  <MainTop />

  <div class="common-container">
    <div class="common-container-line">

      <div class="post-edit-container" v-if="post">
        <h2 class="edit-title">글 수정</h2>
        <form @submit.prevent="updatePost" class="edit-form">
          <div class="form-group">
            <label for="title">제목:</label>
            <input id="title" v-model="post.title" required class="form-input">
          </div>
          <div class="form-group">
            <label for="category">카테고리:</label>
            <select id="category" v-model="post.category" required class="form-input">
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="content">내용:</label>
            <textarea id="content" v-model="post.content" required class="form-textarea"></textarea>
          </div>
          <button type="submit" class="submit-button">수정 완료</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import '@/assets/css/post_edit.css'
import MainTop from '@/components/MainTop.vue'

import api from '@/services/api.js'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/categoryStore'

const categoryStore = useCategoryStore()
const categories = categoryStore.getCategoryByValue()

const route = useRoute()
const router = useRouter()
const post = ref(null)

const fetchPost = async () => {
  try {
    const response = await api.getCommunityPostById(route.params.id)
    post.value = response
  } catch (error) {
    console.error('Error fetching post:', error)
  }
}

const updatePost = async () => {
  try {
    await api.updateCommunityPost(route.params.id, post.value)
    router.push(`/community/${route.params.id}`)
  } catch (error) {
    console.error('Error updating post:', error)
  }
}

onMounted(fetchPost)
</script>
