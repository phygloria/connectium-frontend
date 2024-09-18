<template>
    <div class="login-container">
      <div class="login-form">
        <h1>로그인</h1>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username">유저 ID</label>
            <input id="username" v-model="username" placeholder="유저 ID" required>
          </div>
          <div class="form-group">
            <label for="password">패스워드</label>
            <input id="password" v-model="password" type="password" placeholder="패스워드" required>
          </div>
          <button type="submit" class="login-button" :disabled="isLoading">
            {{ isLoading ? '로그인 중...' : '로그인' }}
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
    name: 'UserLogin',
    setup() {
      const router = useRouter();
      const username = ref('');
      const password = ref('');
      const error = ref('');
      const isLoading = ref(false);
  
      const login = async () => {
        error.value = '';
        isLoading.value = true;
        try {
          const response = await api.login(username.value, password.value);
          api.setAuthHeader(response.data.token);
          router.push('/');
        } catch (err) {
          console.error('Login failed', err.response ? err.response.data : err.message);
          error.value = err.response?.data?.message || '로그인에 실패했습니다. 다시 시도해 주세요.';
        } finally {
          isLoading.value = false;
        }
      };
  
      return {
        username,
        password,
        login,
        error,
        isLoading
      };
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .login-form {
    background-color: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    font-family: Pretendard, sans-serif;
  }
  
  .login-button {
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
  
  .login-button:hover {
    background-color: #9ed334;
  }
  
  .error-message {
    color: red;
    text-align: center;
    margin-top: 1rem;
  }
  
  .login-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  </style>