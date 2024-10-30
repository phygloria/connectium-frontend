<template>
  <div class="background-container">
    <div class="background-container-box">
      <div class="signup-container">
        <div class="signup-form">
          <h1 class="signup-title">회원가입</h1>
          <form @submit.prevent="register">
            <div class="form-group">
              <label for="name">이름</label>
              <input id="name" v-model="name" placeholder="이름" required>
            </div>
            <div class="form-group">
              <label for="phoneNumber">핸드폰 번호</label>
              <input id="phoneNumber" v-model="phoneNumber" placeholder="핸드폰 번호" required>
            </div>
            <div class="form-group">
              <label for="username">유저 ID</label>
              <input id="username" v-model="username" placeholder="유저 ID" required>
            </div>
            <div class="form-group">
              <label for="email">이메일</label>
              <input id="email" v-model="email" type="email" placeholder="이메일" required>
            </div>
            <div class="form-group">
              <label for="password">패스워드</label>
              <input id="password" v-model="password" type="password" placeholder="패스워드" required>
            </div>
            <button type="submit" class="signup-button" :disabled="isLoading">
              {{ isLoading ? '가입 중...' : '회원가입' }}
            </button>
          </form>
          <p v-if="error" class="error-message">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const name = ref('');
const phoneNumber = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

const register = async () => {
  error.value = '';
  isLoading.value = true;
  try {
    await api.register(name.value, phoneNumber.value, username.value, email.value, password.value);
    router.push('/login');
  } catch (err) {
    console.error('Registration error:', err.response ? err.response.data : err.message);
    error.value = err.response?.data?.message || '회원가입에 실패했습니다. 다시 시도해 주세요.';
  } finally {
    isLoading.value = false;
  }


};
</script>

<style scoped>
.background-container {
  width: 100%;
  height: 100vh;
  /* 전체 높이로 설정 */
  padding: 1rem;
  /* 자식 요소의 기준점 */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

}

.background-container-box {
  width: 98%;
  height: 98%;
  background: #f7f7f7;
  box-shadow: 0px 3px 7px #DBFA5F;
  border-radius: 50px;
  overflow: hidden;
  /* 자식 요소가 넘치지 않도록 */
}

.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%
}

.signup-form {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(195, 195, 195, 0.1);
  width: 500px;
}

.signup-title {
  color: #95B2FF;
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: 'MangoByeolbyeol', sans-serif;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-family: Pretendard, sans-serif;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-family: Pretendard, sans-serif;
  box-shadow: 0 3px 5px 0 rgba(157, 170, 156, 0.397);
}

.signup-button {
  width: 100%;
  padding: 0.5rem;
  background-color: #90ce2d;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'MangoByeolbyeol', sans-serif;
}

.signup-button:hover {
  background-color: #9ed334;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 1rem;
}

.signup-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>