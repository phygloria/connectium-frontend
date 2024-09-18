<template>
    <header class="top-header">
        <div class="top-bar">
            <div class="top-container">
                <div class="upper-section">
                    <div class="logo-slogan">
                        <router-Link to="/">
                            <img class="imageLogo" src="/connectiumLogoLight.png" alt="">
                        </router-Link>
                        <div class="text-container">
                            <h2 class="slogan">
                                <span>아이랑</span>
                                <span>자유롭게</span>
                                <span>이어지는</span>
                                <span>우리중랑</span>
                            </h2>
                            <h1 class="serviceName">커넥티움+</h1>
                        </div>
                    </div>
                </div>

                <div class="auth-container">
                    <div class="auth-section">
                        <template v-if="!isLoggedIn">
        <router-link to="/login" class="auth-link">로그인</router-link>
        <router-link to="/register" class="auth-link">회원가입</router-link>
      </template>
      <a v-else @click="logout" class="auth-link">로그아웃</a>
    </div>
                    <div class="top-search-container">
                        <div class="top-search-box">
                            <input type="text" class="top-search" placeholder="검색" />
                            <img class="top-search-icon" src="@/assets/images/icon/searchtool.png" alt="검색" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="lower-section">
                <nav class="main-nav">
                    <router-link to="#" class="nav-item">공지사항</router-link>
                    <router-link to="/community" class="nav-item">우리아이 커뮤니티</router-link>
                    <router-link to="/educationProgram" class="nav-item">교육 프로그램</router-link>
                    <router-link to="/outdoor/park" class="nav-item">신나는 우리동네</router-link>
                    <router-link to="#" class="nav-item">우리 같이가요!</router-link>
                    <router-link to="/postList" class="nav-item">QnA</router-link>
                </nav>
            </div>
        </div>
    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';  // api 서비스 import

const router = useRouter();
const isLoggedIn = ref(false);

onMounted(() => {
  checkLoginStatus();
});

function checkLoginStatus() {
  const token = localStorage.getItem('token');
  isLoggedIn.value = !!token;
}

async function logout() {
  try {
    await api.logout();
    localStorage.removeItem('token');
    isLoggedIn.value = false;
    router.push('/');
  } catch (error) {
    console.error('로그아웃 실패:', error);
  }
}
</script>

<style src="@/assets/font.css"></style>

<style scoped>
/* 스타일유지 */
.top-header {
    padding: 0% 2%;
}

.top-bar {
    width: 100%;
    background: #a9da49;
    box-shadow: 0px 3px 7px #DBFA5F;
    border-radius: 50px;
    padding: 1% 30%;
    display: flex;
    flex-direction: column;
}
.top-container {
        margin: 0 30%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

.upper-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.logo-slogan {
    display: flex;
    text-align: center;
    align-items: center;
   
}
.slogan {
    display: flex;;
    color: white;
    font-size: 25px;
    font-family: 'MangoByeolbyeol', sans-serif;
    font-weight: 400;
    margin-right: 10px;
    word-break: keep-all;
    white-space: normal;
    line-height: 1.2;
    text-align: center;
}

.text-container {
    display: flex;
    
    
}

.text-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    text-shadow: 1px 1px 2px rgba(31, 31, 31, 0.5);
}

.auth-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.auth-section {
    display: flex;
    margin-bottom: 10px;
}

.auth-link {
    margin-left: 20px;
    color: white;
    font-size: 20px;
    font-family: Pretendard;
    font-weight: 900;
    text-decoration: none;
}

.lower-section {
    width: 95%;
    align-self: center;
}

.main-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
}

.nav-item {
    color: black;
    text-decoration: none;
    white-space: nowrap;
    text-align: center;
    padding: 5px 10px;
    flex: 0 1 auto;
    min-width: fit-content;
    word-break: keep-all;
}


/* 아이패드 가로 크기에 대응하는 미디어 쿼리 추가 */
@media (max-width: 2048px) {
    .top-bar {
    width: 100%;
    background: #a9da49;
    box-shadow: 0px 3px 7px #DBFA5F;
    border-radius: 50px;
    padding: 1% 10%;
    display: flex;
    flex-direction: column;
    }

    .top-container {
        margin: 0 50px;
    }

    .imageLogo {
        width: 70px;
        margin-right: 20px;
        margin-left: 30px;
    }

    .slogan {
        color: white;
        font-size: 25px;
        font-family: 'MangoByeolbyeol', sans-serif;
        font-weight: 400;
        margin-right: 10px;
        word-break: keep-all;
        white-space: normal;
        line-height: 1.2;
    }

    .serviceName {
        color: white;
        font-size: 40px;
        font-family: 'MangoByeolbyeol', sans-serif;
        font-weight: 400;
        margin: 0;
        -webkit-text-stroke: 5px #9ed334;
        paint-order: stroke fill;
        white-space: nowrap;
    }

    .auth-section {
        display: flex;
        color: white;
        font-size: 20px;
        font-family: Pretendard;
        font-weight: 900;
        margin-bottom: 10px;
        margin-right: 60px;
    }

    .top-search-container {
        position: relative;
        width: 200px;
        height: 50px;
        margin-right: 30px;
    }

    .top-search-box {
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 20px;
        border: 2px #C0EA6A solid;
        display: flex;
        align-items: center;
        position: relative;
    }

    .top-search {
        width: 100%;
        height: 100%;
        border: none;
        background: transparent;
        outline: none;
        padding: 0 40px 0 20px;
        /* 수정 */
        font-size: 20px;
        font-family: Pretendard;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
    }

    .search::placeholder {
        color: rgba(0, 0, 0, 0.3);
        line-height: 50px;
        /* 추가: search-box의 높이와 동일하게 설정 */
        vertical-align: middle;
        /* 추가 */
    }

    .top-search-icon {
        position: absolute;
        width: 20px;
        height: 20px;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
    }

    .main-nav {
        justify-content: space-around;
    }

    .nav-item {
        margin: 5px 10px;
        flex: 0 1 auto;
    }

    .slogan {
        font-size: 22px;
    }

    .serviceName {
        font-size: 36px;
    }
}

/* 중간 크기 화면에 대한 대응 */
@media (max-width: 1024px) {
    .top-header {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .top-bar {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .top-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin: 0;
    }

    .upper-section {
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .logo-slogan {
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }

    .text-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .text-wrapper {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }


    .auth-container {
        flex-direction: column;
    }

    .auth-section {
        margin-right: 0;
        margin-bottom: 15px;
    }

    .auth-link {
        margin: 0 10px;
    }

    .top-search-container {
        width: 100%;
        max-width: 200px;
        margin-right: 0;
    }

    .lower-section {
        width: 100%;
    }

    .main-nav {
        flex-direction: column;
        align-items: center;
    }

    .nav-item {
        margin: 5px 0;
        width: 100%;
        text-align: center;
    }
}

/* 더 작은 화면에 대한 추가 대응 */
@media (max-width: 800px) {
    .auth-container {
        flex-direction: column;
    }

    .auth-section {
        margin-right: 0;
        margin-bottom: 15px;
    }
}

/* 매우 작은 화면에 대한 대응 */
@media (max-width: 480px) {

    .auth-container,
    .auth-section,
    .top-search-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .auth-link {
        margin: 5px 0;
    }

    .top-search-container {
        max-width: 100%;
    }
}
</style>