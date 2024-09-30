<!-- MainTop.vue -->
<template>
    <header class="top-header">
        <div class="top-bar common-width">
            <div class="top-container">
                <div class="upper-section">
                    <div class="logo-slogan">
                        <div>
                            <router-Link to="/">
                                <img class="imageLogo" src="/connectiumLogoLight.png" alt="">
                            </router-Link>

                        </div>
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

                <div class="wheather-bar">
                    <div class="weather-compo">
                        <WeatherContainer />
                    </div>
                </div>

                <div class="auth-container">
                    <div class="hamburger-menu" @click="toggleMenu">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                    <div class="auth-section" :class="{ 'open': isMenuOpen }">
                        <template v-if="!isLoggedIn">
                            <div class="auth-link">
                                <router-link to="/login" @click="closeMenu">로그인</router-link>
                            </div>
                            <div class="auth-link">
                                <router-link to="/register" @click="closeMenu">회원가입</router-link>
                            </div>
                        </template>
                        <template v-else>
                            <div class="auth-link">
                                <a @click="logout">로그아웃</a>
                            </div>
                            <div class="auth-link">
                                <router-link to="/mypage" @click="closeMenu">마이페이지</router-link>
                            </div>
                        </template>
                    </div>
                    <!-- <div class="top-search-container">
                        <div class="top-search-box">
                            <input type="text" class="top-search" placeholder="검색" />
                            <img class="top-search-icon" src="@/assets/images/icon/searchtool.png" alt="검색" />
                        </div>
                    </div> -->
                </div>
            </div>





            <div class="lower-section">
                <nav class="main-nav">
                    <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="nav-item"
                        active-class="active-nav-item">
                        {{ item.label }}
                    </router-link>
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
import WeatherContainer from '@/components/weatherComponents/WeatherContainer.vue';

const router = useRouter();
const isLoggedIn = ref(false);
const isMenuOpen = ref(false);

onMounted(() => {
    checkLoginStatus();
});

function checkLoginStatus() {
    const token = localStorage.getItem('token');
    isLoggedIn.value = !!token;
}

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
    isMenuOpen.value = false;
}

async function logout() {
    try {
        await api.logout();
        localStorage.removeItem('token');
        isLoggedIn.value = false;
        router.push('/');
        closeMenu();
    } catch (error) {
        console.error('로그아웃 실패:', error);
    }
}



const navItems = [
    //   { path: '/serviceInfo', label: '커넥티움?' },
    { path: '/community', label: '우리아이 커뮤니티' },
    { path: '/program', label: '몸으로 놀아요' },
    { path: '/education', label: '즐겁게 공부하자' },
    { path: '/outdoor/park', label: '신나는 우리동네' },
    //   { path: '#', label: '우리 같이가요!' },
    { path: '/postList', label: 'QnA' },
];
</script>










<style src="@/assets/font.css"></style>

<style scoped>
/* 날씨 */
.wheather-bar {
    position: relative;
    left: 10%;
    right: 5%;
}

.weather-compo {
    align-items: center;
    width: 150px;
    height: 80px;
}



/* 햄버거 메뉴 */

.auth-container {
    position: relative;
    align-items: center;
    z-index: 1000;
    /* 다른 컴포넌트보다 위에 오도록 z-index 추가 */
}

.hamburger-menu {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 25px;
    cursor: pointer;
    z-index: 10;
    position: absolute;
    /* 추가: 상대 위치 설정 */
    top: 20%;
    /* 추가: 20px 아래로 이동 */
    right: 20px;
    /* 오른쪽 정렬 유지 */
}

.bar {
    width: 100%;
    height: 3px;
    background-color: white;
    transition: all 0.3s ease-in-out;
}


.auth-section {
    position: absolute;
    top: 60%;
    right: 0;
    background-color: #fffffF;
    /* 변경: 메뉴 배경색을 어둡게 */
    padding: 10px;
    border-radius: 0 0 10px 10px;

    align-items: center;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease-in-out;
}

.auth-section.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.auth-link {
    margin: 0 10px;
    /* 유지: 좌우 여백 */
    color: #42c6dd;
    font-size: 16px;
    font-family: Pretendard;
    font-weight: 700;
    text-decoration: none;
    flex-direction: column;
    /* 변경: 세로 정렬 */
    align-items: center;
    /* 변경: 중앙 정렬 */
    justify-content: center;
    /* 추가: 세로 중앙 정렬 */
    text-align: center;
    /* 추가: 텍스트 중앙 정렬 */
    white-space: nowrap;
    /* 추가: 줄바꿈 방지 */
}

.auth-link a {
    color: inherit;
    text-decoration: none;
    white-space: nowrap;
    /* 추가: 링크 내부 텍스트의 줄바꿈 방지 */
}






/* 스타일유지 */
.top-header {
    padding: 0 calc((100% - var(--main-content-width)) / 2);
}

.top-bar {
    width: 100%;
    max-width: var(--main-content-width);
    margin: 0 auto;
    background: #a9da49;
    box-shadow: 0px 3px 7px #DBFA5F;
    border-radius: 50px;
    padding: var(--main-content-padding);
}

.top-container {
    display: flex;
    justify-content: space-between;
    margin: 0 30px;
}


.imageLogo {
    width: 70px;
    margin-right: 20px;
    margin-left: 30px;
}


.logo-slogan {
    display: flex;
    align-items: center;

}

.slogan {
    display: flex;
    color: white;
    font-size: 25px;
    font-family: 'MangoByeolbyeol', sans-serif;
    font-weight: 400;
    margin-right: 20px;
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


.auth-container {
    align-items: flex-end;
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

.lower-section {
    display: flex;
    justify-content: center;
}

.main-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.nav-item {
    color: rgb(255, 255, 255);
    text-decoration: none;
    white-space: nowrap;
    text-align: center;
    font-family: 'Pretendard-Bold';
    font-size: 20px;
    padding: 5px 10px;
    flex: 0 1 auto;
    min-width: fit-content;
    word-break: keep-all;
    text-shadow: 1px 1px 2px rgba(31, 31, 31, 0.5);
    transition: background-color 0.3s, color 0.3s;
}

.active-nav-item {
    background-color: #ffffff;
    color: #90ce2d;
    border-radius: 5px;
    text-shadow: none;
}









/* 반응형 스타일 */




/* 아이패드 가로 크기에 대응하는 미디어 쿼리 추가 */
@media (max-width: 2048px) {

    /* 날씨 */
    .wheather-bar {
        left: 10%;
    }

    .weather-compo {
        width: 140px;
        height: 75px;
    }



    /* 햄버거 */
    .hamburger-menu {
        position: absolute;
        right: 40%;
    }



    /* 메인탑 */
    .slogan {
        font-size: 25px;
    }

    .serviceName {
        font-size: 40px;
    }

}

/* 중간 크기 화면에 대한 대응 */
@media (max-width: 1024px) {

    /* 날씨 */
    .wheather-bar {
        left: 30%;
    }

    .weather-compo {
        width: 130px;
        height: 70px;
    }


    /* 햄버거 */

    .auth-container {
        position: absolute;
        top: 29%;
        width: 100%;
        /* 추가: 전체 너비 사용 */
        right: 9%;
    }

    .hamburger-menu {
        position: absolute;
        top: 50%;
    }

    .auth-section {
        width: 15%;
        left: 35%;
        border-radius: 10px;
        /* 변경: 상단 모서리만 둥글게 */
        justify-content: center;
    }


    .auth-section.open {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .auth-link {
        margin: 5px 10px;
        /* 수정: 좌우 여백 추가 */
    }



    /* 메인탑 */
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

    .top-search-container {
        width: 100%;
        max-width: 200px;
        margin-right: 0;
    }

    .lower-section {
        width: 80%;
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

    /* 날씨 */
    .wheather-bar {
        left: 35%;
    }

    .weather-compo {
        width: 120px;
        height: 65px;
    }

    /* 햄버거 */
    .auth-container {
        position: absolute;
        top: 28%;
        width: 100%;
        /* 추가: 전체 너비 사용 */
        right: 8%;
    }

    .auth-section {
        top: 20%;
        left: 35%;

    }


}

/* 매우 작은 화면에 대한 대응 */
@media (max-width: 480px) {
    /* 날씨 */
    .wheather-bar {
        left: 35%;
        top: 15%;
    }

    .weather-compo {
        width: 120px;
        height: 65px;
    }


    .top-search-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .top-search-container {
        max-width: 100%;
    }

    /* 햄버거 */
    .auth-container {
        position: absolute;
        top: 28%;
        width: 100%;
        /* 추가: 전체 너비 사용 */
        right: 8%;
    }

    .auth-section {
        width: 25%;
        left: 15%;
    }

}


@media (max-width: 418px) {

    
    .wheather-bar {
        left: 35%;
        top: 15%;
    }

    .weather-compo {
        width: 90px;
        height: 70px;
    }


    /* 햄버거 */
    .auth-container {
        position: absolute;
        top: 30%;
        width: 100%;
        /* 추가: 전체 너비 사용 */
        right: 6%;
    }

    .auth-section {
        width: 25%;
        left: 15%;
    }

}
</style>