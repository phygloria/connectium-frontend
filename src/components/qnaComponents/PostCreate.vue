<template>

  <MainTop />

  <div class="common-Container">
    <div class="common-ContainerLine">
      <div>
        <h2 class="question">질문하기</h2>
        <div class="bodyContainer">
          <div class="bodyBar">
            <form @submit.prevent="createPost">
              <div class="input-row">
                <div class="input-wrapper title-wrapper">
                  <input id="title" v-model="post.title" required placeholder="제목">
                  <span class="input-label">Title</span>
                </div>
                <div class="input-wrapper author-wrapper">
                  <input id="author" v-model="post.author" required placeholder="글쓴이">
                  <span class="input-label">User</span>
                </div>
              </div>
              <div class="content-wrapper">
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

<style scoped>
.common-Container {
  padding: 20px 30px 20px 30px;
}

.common-ContainerLine {
  width: 100%;
  box-shadow: 0px 3px 7px #DBFA5F;
  border-radius: 50px;
  border: 2px #8CD000 solid;
  height: auto;
  min-height: 330px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.bodyBar {
  margin: 0 20% 2% 20%;
}

.input-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  width: 100%;
}

.input-wrapper {
  position: relative;
}

.title-wrapper {
  flex: 3;
  margin-right: 15px;
}

.author-wrapper {
  flex: 1;
}

.input-wrapper+.input-wrapper {
  margin-left: 20px;
}

.input-label {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #555555;
  font-size: 14px;
  pointer-events: none;
}

textarea+.input-label {
  top: 15px;
  transform: none;
}

input,
textarea {
  width: 100%;
  padding: 10px 15px 10px 70px;
  border: 2px #555555 solid;
  border-radius: 20px;
  box-shadow: 0px 3px 7px #555555;
  font-size: 15px;
  background: white;
}

input::placeholder,
textarea::placeholder {
  opacity: 0.5;
}

.question {
  color: #707070;
  font-size: 70px;
  font-family: MangoByeolbyeol;
  font-weight: 400;
  word-wrap: break-word;
  margin-bottom: 20px;
}

#title {
  width: 100%;
  height: 50px;
  background: white;
  box-shadow: 0px 3px 7px #c4c4c4;
  border-radius: 20px;
  border: 3px #ffffff solid;
}

#author {
  width: 100%;
  height: 50px;
  background: white;
  box-shadow: 0px 3px 7px #c4c4c4;
  border-radius: 20px;
  border: 3px #ffffff solid;
}

form {
  display: flex;
  flex-direction: column;

}

label {
  margin-bottom: 5px;
  color: #666;
}

input[type="text"],
textarea {
  width: 100%;
  height: 100%;
  padding: 10px;
  margin-bottom: 5px;
  border: 2px #8CD000 solid;
  border-radius: 20px;
  box-shadow: 0px 3px 7px #B3E000;
  font-size: 15px;
  background: white;
}

.content-wrapper {
  position: relative;
  width: 100%;
}

textarea {
  width: 100%;
  height: 350px;
  resize: vertical;
  padding-top: 50px;
  padding-left: 30px;
  padding-right: 120px;
  /* 오른쪽에 아이콘을 위한 공간 확보 */
  box-shadow: 0px 3px 7px #c4c4c4;
  border-radius: 20px;
  border: 3px #ffffff solid;
}

.image-upload-area {
  position: absolute;
  top: 40px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-upload-text {
  color: #555555;
  font-size: 15px;
  margin-bottom: 5px;
  margin-right: 10px;
}

.imageUpIcon {
  position: absolute;
  top: 30px;
  right: 0px;
  width: 100px;
  height: auto;
  opacity: 0.3;
  border: 1px solid #555555;
  cursor: pointer;
  z-index: 1;
  /* textarea 위에 표시되도록 */
}

.upload-image {
  position: absolute;
  top: 520px;
  right: 70px;
  width: 100px;
  height: auto;
  opacity: 0.3;
  border: 1px solid #555555;
  cursor: pointer;
  z-index: 1;
  /* textarea 위에 표시되도록 */
}

.preview-container {
  position: relative;
  display: inline-block;
}

.remove-preview {
  top: 15px;
  right: 5px;
  background-color: rgba(221, 136, 136, 0.7);
  border: none;
  border-radius: 50%;
  padding: 5px 10px;
  margin-top: 5px;
  cursor: pointer;
}

.btn {
  width: 100%;
  height: 100%;
  position: relative;
}

#submit {
  width: 200px;
  height: 50px;
  background: #707070;
  box-shadow: 0px 3px 7px #c4c4c4;
  border-radius: 20px;
  border: 3px #ffffff solid;
  color: white;
  font-size: 20px;
  font-family: Mango Ddobak;
  font-weight: 400;
  letter-spacing: 1.50px;
  word-wrap: break-word;
  cursor: pointer;
  /* 마우스 커서를 포인터로 변경 */
  transition: background-color 0.2s ease;
  /* 부드러운 색상 전환 효과 */
}

#submit:hover {
  background: #8CD000;
}


@media (max-width: 768px) {
  .input-row {
    flex-direction: column;
  }

  .title-wrapper,
  .author-wrapper {
    width: 100%;
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style>