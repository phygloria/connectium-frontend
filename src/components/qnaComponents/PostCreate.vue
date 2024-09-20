<template>

  <MainTop />

  <div class="common-container">
    <div class="common-container-line">
      <div>
        <h2 class="component-title">질문하기</h2>
        <div class="bodyContainer">
          <div class="bodyBar">
            <form @submit.prevent="createPost" class="c-form">
              <div class="input-row">
                <div class="input-wrapper title-wrapper">
                  <input id="title" v-model="post.title" required placeholder="제목">
                  <span class="input-label">Title</span>
                </div>
                <!-- <div class="input-wrapper author-wrapper">
                  <input id="author" v-model="post.author" required placeholder="글쓴이">
                  <span class="input-label">User</span>
                </div> -->
              </div>
              <div class="c-content-wrapper">
                <div class="input-wrapper">
                  <textarea id="content" v-model="post.content" required placeholder="질문내용"></textarea>
                  <span class="input-label">Question</span>
                </div>

                <br>
                <!-- 이미지 업로드 -->
                <div class="image-upload-area">
                  <div v-if="!previewUrl">
                    <span class="image-upload-text">이미지 선택 </span>
                    <input type="file" id="upload-image" @change="onFileSelected" ref="fileInput" hidden accept="image/*" />
                    <label for="upload-image">
                      <img class="imageUpIcon" src="@/assets/images/icon/icon_upload.png" alt="Upload icon" />
                    </label>
                    <h6 class="file-size"> 1MB 미만의 jpg파일</h6>
                  </div>
                </div>
              </div>
              <!-- 선택한 이미지 미리보기 -->
              <div v-if="previewUrl" class="preview=container">
                <img :src="previewUrl" alt="Preview" style="max-width: 300px;">
                <br>
                <button @click="removePreview" class="remove-preview">X</button>
              </div>

              <div v-if="uploadStatus">{{ uploadStatus }}</div>


              <br>
              <!-- 작성완료 버튼 -->
              <div class="btn">
                <button type="submit" id="submit">질문하기</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import '@/assets/css/common_container.css'
import '@/assets/css/create.css';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import MainTop from '@/components/MainTop.vue';
import api from '@/services/api';

const router = useRouter();

const post = reactive({
  title: '',
  author: '',
  content: '',
  imageUrl: ''
});

const selectedFile = ref(null);
const previewUrl = ref(null);
const uploadStatus = ref('');
const fileInput = ref(null);

const createPost = async () => {
  try {
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('author', post.author);
    formData.append('content', post.content);
    if (selectedFile.value) {
      formData.append('image', selectedFile.value);
    }

    const response = await api.createPost(formData);
    console.log('Response:', response);
    router.push('/postList');
  } catch (error) {
    console.error('Error creating post:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
  }
};

const onFileSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    createPreview();
  } else {
    selectedFile.value = null;
    previewUrl.value = null;
  }
};

const createPreview = () => {
  const reader = new FileReader();
  reader.onload = (e) => {
    previewUrl.value = e.target.result;
  };
  reader.readAsDataURL(selectedFile.value);
};

const removePreview = () => {
  previewUrl.value = null;
  selectedFile.value = null;
  uploadStatus.value = '';
  if (fileInput.value) fileInput.value.value = '';
};


</script>