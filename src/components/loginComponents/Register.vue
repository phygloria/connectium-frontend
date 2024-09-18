<template>
    <div class="signup-container">
      <div class="signup-form">
        <h1>회원가입</h1>
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
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import api from '@/services/api';
  
  export default {
    name: 'UserRegister',
    setup() {
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
  
      return {
        name,
        phoneNumber,
        username,
        email,
        password,
        register,
        error,
        isLoading
      };
    }
  };
  </script>
  
  <style scoped>
  .signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .signup-form {
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(195, 195, 195, 0.1);
    width: 300px;
  }
  
  h1 {
    color: #a8dd3f;
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
    background-color: #a8dd3f;
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