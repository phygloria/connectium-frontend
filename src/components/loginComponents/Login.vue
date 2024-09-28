<template>
  <div class="background-container">
    <div class="background-container-box">
      <div class="login-img-container">
        <div class="login-logo-container">
          <img class="login-logo" src="@/assets/images/logo/connectiumLogo.png" />
        </div>
        <img class="login-back-img" src="@/assets/images/login/loginImage_a.png" />
      </div>
    </div>
  </div>

  <div class="login-container">
    <div class="login-form">
      <h1 class="login-title">Login</h1>
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
      <div class="idpwrgi-find-bar">
        <!-- <router-link to="/register" class="h6">아이디 찾기</router-link>
        <router-link to="/register" class="h6">비밀번호 찾기</router-link> -->
        <router-link to="/register" class="h6">회원가입</router-link>
      </div>
      <!-- <div class="quick-login">
        <div>
          <div>
            <img class="quick-icon" src="@/assets/images/icon/googleLogo.png" />
            <img class="quick-icon" src="@/assets/images/icon/naverLogo.png" />
          </div>
        </div>
        <div class="quick-text">
          <h6 class="quick-text">간편 로그인</h6>
        </div>
      </div> -->
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


.background-container {
  width: 100%;
  height: 100vh;
  /* 전체 높이로 설정 */
  padding: 1rem;
  /* 자식 요소의 기준점 */
  overflow: hidden;
  display: flex;
  justify-content: center;

}

.background-container-box {
  width: 95%;
  height: 90%;
  top: 45px;
  background: #f7f7f7;
  box-shadow: 0px 3px 7px #DBFA5F;
  border-radius: 50px;
  overflow: hidden;
  /* 자식 요소가 넘치지 않도록 */
}

.login-logo-container {
  position: absolute;
  bottom: 10%;
  left: 3%;
}




.login-img-container {
  width: 100%;
  height: 100%;
  position: relative;
  margin-left: 1.5%;
  display: flex;
  /* Flexbox 사용 */
  align-items: center;
  /* 수직 중앙 정렬 */
}

.login-back-img {
  width: 65%;
  /* background-container-box보다 2% 작게 */
  height: 95%;
  /* background-container-box보다 2% 작게 */
  object-fit: cover;
  /* 이미지 비율 유지 */
  border-radius: 30px;
}


.login-container {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 55%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 10;
  
}

.login-form {
  background-color: rgba(255, 255, 255, 0.9);
  /* 흰색 배경에 70% 불투명도 */
  padding: 3rem;
  border-radius: 5%;
  box-shadow: 0 2px 7px 0px rgba(149, 149, 149, 0.3);
  border: 2px #a9da49 solid;
  width: 500px;
  height: 600px;
  margin-left: 20%;
  /* login-form을 왼쪽으로 이동시켜 이미지와 겹치게 함 */
}

.login-title {
  width: 100%;
  font-size: 70px;
  font-family: MangoByeolbyeol;
  font-weight: 400;
  word-wrap: break-word;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #a9da49;
  
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

#username,
#password {
  width: 90%;
  padding: 0.5rem;
  padding-left: 5%;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-family: Pretendard, sans-serif;
  box-shadow: 0 3px 5px 0 rgba(157, 170, 156, 0.397);
}

/* Placeholder 스타일 */
#username::placeholder,
#password::placeholder {
  font-family: 'Mango Ddobak';
  font-size: 0.85rem;
  color: #999;

}

.login-button {
  width: 50%;
  padding: 0.5rem;
  background-color:  #90ce2d;
  color: rgb(255, 255, 255);
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



.idpwrgi-find-bar {
  display: flex;
  justify-content: center;
  font-size: 1rem;
  margin-bottom: 10%;
}

.quick-login{
  justify-content: center;
  align-items: center;
  margin-bottom: 5%;
}

.h6 {
  display: flex;
  font-family: 'Mango Ddobak';
  margin-right: 5%;
  margin-top: 5%;
  text-decoration: none;
}
.quick-icon{
  width: 30px;
  height: 30px;
  margin-right: 10%;
  margin-left: 10%;
  opacity: 80%;
}

.quick-text{
  color: #b0b0b0;
  display: flex;
  justify-content: center;
  font-family: 'Mango Ddobak';
}





/* 더 작은 화면에 대한 추가 대응 */
@media (max-width: 800px) {
 

  .login-container {
    justify-content: center;
    width: 100%; /* 전체 너비 사용 */
  }
  
  .login-form {
        margin-left: 0; /* 왼쪽 마진 제거 */
    width: 90%; /* 폼의 너비를 90%로 조정 */
    max-width: 400px; /* 최대 너비 설정 */
    max-height: 500px;
  }

  .background-container-box {
  width: 100%;
  height: 90%;
}

  .login-img-container {
    margin-left: 0; /* 왼쪽 마진 제거 */
    display: inline;
    top:3%;
  }
  .login-back-img {
    
  width: 95%;
  object-fit: fill;

}
}

/* 매우 작은 화면에 대한 대응 */
@media (max-width: 480px) {
  .login-container {
    position: fixed; /* 고정 위치로 변경 */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: none; /* transform 제거 */
    background-color: rgba(255, 255, 255, 0.9); /* 배경색 추가 */
    z-index: 1000; /* 다른 요소들 위에 표시 */
  }

  .login-form {
    height: auto; /* 높이를 자동으로 조정 */
    width: 90%; /* 폼의 너비를 90%로 조정 */
    max-width: 350px; /* 최대 너비 설정 */
    padding: 2rem; /* 패딩 줄임 */
  }
}
</style>