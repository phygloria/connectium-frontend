<template>

    <MainTop />

    <div class="common-container">
        <div class="common-container-line">
            <div class="bodyContainer">
                <div class="img-Container">
                    <div class="background-image1"></div>
                    <div class="background-image2"></div>
                </div>
                <div class="body-title">
                    <h1 class="service-title">커넥티움?</h1>
                    <h5 class="sub-text">아이들이 모여서 놀고 체험할 수 있는 모든 관련 시설을 연결해 주는 플랫폼</h5>
                </div>

                <div class="content-wrapper">

                    <div class="body-bar">
                        <div class="solution-big-box">
                            <h4 class="needs-text">많은 사람들이 구, 시에서 운영하는 관련 센터들은 정보를 잘 모르고, <br>
                                넘어가는 경우가 많다. 왜? 정보를 하나로 모은 곳이 없기 때문에!</h4>
                            <h4 class="solution-text">"아이들을 위한 장소, 커넥티움이 연결합니다."</h4>
                        </div>

                        <div class="service-good-point-bar">
                            <div class="point-title-box">
                                <h4 class="point-title">공공기관에서 운영하는 센터 및 프로그램의 장점</h4>
                            </div>
                            <div class="point-box-bar">
                                <div class="point-small-box">
                                    <div class="point-text">
                                        <p>예약제 운영</p>
                                        <p>소수 인원으로</p>
                                        <p>넉넉한 체험</p>
                                    </div>
                                </div>
                                <div class="point-small-box">
                                    <div class="point-text">
                                        <p>수준높은</p>
                                        <p>안전관리</p>
                                    </div>
                                </div>
                                <div class="point-small-box">
                                    <div class="point-text">
                                        <p>가격이</p>
                                        <p>저렴하거나</p>
                                        <p>무료시설 운영</p>
                                    </div>
                                </div>
                                <div class="point-small-box">
                                    <div class="point-text">
                                        <p>깨끗하고</p>
                                        <p>훌륭한 시설</p>
                                    </div>
                                </div>
                                <div class="point-small-box">
                                    <div class="point-text">
                                        <p>다양한 연령대가</p>
                                        <p>만족하는</p>
                                        <p>우수한 프로그램</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>


</template>

<script setup>
import '@/assets/css/common_container.css'
import MainTop from '@/components/MainTop.vue';

</script>

<style scoped>
.bodyContainer {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
}
.img-Container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200%; /* 컨테이너 높이를 2배로 설정 */
    z-index: 1;
}
.background-image1,
.background-image2 {
    position: absolute;
    left: 0;
    right: 0;
    height: 50%; /* 각 이미지가 전체 높이의 절반을 차지 */
    background-image: url('@/assets/images/etc/service-info-back.png');
    background-repeat: no-repeat;
    background-size: 100% auto;
    /* 이미지 크기 증가 */
    z-index: 1;
}

.background-image1 {
    top: 30;
    /* body-title 바로 뒤에서 시작 */
    background-position: center top;
}

.background-image2 {
    top: 80%;
    /* 첫 번째 이미지 바로 아래에 위치 */
    background-position: center top;
}

.body-title {
    position: relative;
    z-index: 2;
    text-align: center;
    padding-top: 5%;
}

.content-wrapper {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 0 5%;
    width: 100%;
    min-height: 100vh;
}

/* 배경 이미지 위에 내용이 잘 보이도록 하기 위한 추가적인 스타일 */
.body-bar,
.solution-big-box {
    background-color: rgba(255, 255, 255, 0.2);
    /* 약간의 투명도를 가진 흰색 배경 */
    position: relative;
    z-index: 2;
}


.body-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;
    height: auto;
}

.body-title {
    text-align: center;
    margin: 5% 0;
}

.service-title {
    color: black;
    font-size: 90px;
    font-family: MangoByeolbyeol;
    font-weight: 400;
    word-wrap: keep-all;
    word-break: keep-all;
    overflow-wrap: break-word;
    line-height: 1.2;
    text-align: center;
}

.sub-text {
    font-size: 25px;
    color: #666;
    margin: 5% 0 3% 0;
}

.solution-big-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 0 5% 0;
    width: 100%;
    height: 300px;
    border-radius: 30px;
    box-shadow: 3px 5px 15px 0px rgba(137, 203, 1, 0.50);
}

.needs-text {
    font-size: 25px;
    color: #333;
    margin-bottom: 15px;
    line-height: 1.5;
}

.solution-text {
    color: #000;
    font-family: "Pretendard-Bold";
    font-size: 50px;
    font-style: normal;
    font-weight: 600;
    line-height: 165.249%;
}

.service-good-point-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin: 2% 0;
}

.point-title-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 700px;
    height: 80px;
    border-radius: 50px;
    background: #B3E000;
    box-shadow: 0px 3px 7px 0px #DBFA5F;
    margin: 5% 0;
}

.point-title {
    margin: 0;
    /* 기본 마진 제거 */
    color: #000;
    /* 텍스트 색상 지정 */
    font-size: 25px;
    /* 폰트 크기 조정 */
    font-weight: bold;
    /* 폰트 굵기 조정 */
}

.point-box-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1000px;
    height: 200px;
    flex-shrink: 0;
    margin: 0 0 3% 0;
}

.point-small-box {
    margin: 2%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 190px;
    height: 180px;
    flex-shrink: 0;
    border-radius: 30px;
    box-shadow: 3px 5px 15px 0px rgba(137, 203, 1, 0.50);
}

.point-text {
    font-family: 'Pretendard', sans-serif;
    color: #000;
    text-align: center;
    font-size: 25px;
    font-style: normal;
    font-weight: 600;
    line-height: 1.2;
    /* 이 값을 조정하여 행간을 줄입니다 */
    letter-spacing: -2.5px;
}

.point-text p {
    margin: 5px 0;
    /* p 태그 사이의 간격을 조정합니다 */
}

@media (max-width: 768px) {


    .service-title {
        font-size: 28px;
    }

    .sub-text {
        font-size: 16px;
    }

    .solution-text {
        font-size: 20px;
    }

    .point-title-box {
        font-size: 12px;
        padding: 6px 12px;
    }
}
</style>