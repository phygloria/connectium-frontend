<!-- body 기본 셋팅 -->

<template>
    <div class="common-Container">
        <div class="common-ContainerLine">
            <div class="place-detail">
                <h1 class="place-title">웅기테마공원 <span class="map-icon">🗺️</span></h1>
                <div class="place-content">
                    <div class="image-container">
                        <img src="path-to-your-image.jpg" alt="웅기테마공원" class="main-image">
                        <div class="image-navigation">
                            <!-- 이미지 네비게이션 버튼 -->
                        </div>
                        <div class="like-count">❤️ 17</div>
                        <div class="action-buttons">
                            <button class="map-button">지도보기</button>
                            <button class="like-button">♡</button>
                            <button class="bookmark-button">🔖</button>
                        </div>
                    </div>
                    <div class="info-container">
                        <div class="info-item">
                            <h3>기본정보</h3>
                            <p>웅기 가마, 웅기 정원, 데크 광장, 운전의 정원, 전망대, 체험장 등으로 이루어진 공원 체험장은 웅기체험장, 목공예체험장, 원지세월 장으로 이루어짐</p>
                        </div>
                        <div class="info-item">
                            <h3>위치</h3>
                            <p>서울시 중랑구 신내로21길 116 (신내동 777)</p>
                            <button class="direction-button">지도보기</button>
                        </div>
                        <div class="info-item">
                            <h3>운영시간</h3>
                            <p>매일 00:00 ~ 23:59</p>
                        </div>
                        <div class="info-item">
                            <h3>편의시설</h3>
                            <div class="facility-icons">
                                <!-- 편의시설 아이콘들 -->
                            </div>
                        </div>
                        <div class="info-item">
                            <h3>가격</h3>
                            <p>입장료 0</p>
                        </div>
                        <div class="info-item">
                            <h3>예약방법</h3>
                            <p>방문, 전화, 인터넷</p>
                        </div>
                        <div class="info-item">
                            <h3>문의처</h3>
                            <p>02-1233-4567 / 010-1233-4567</p>
                        </div>
                    </div>
                </div>
                <div class="review-section">
                    <h3>리뷰쓰기</h3>
                    <textarea placeholder="리뷰를 작성해주세요"></textarea>
                </div>
            </div>


        </div>
    </div>
</template>



<script setup>
// 여기에 필요한 imports와 로직을 추가하세요
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

.place-detail {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.place-title {
    font-size: 24px;
    margin-bottom: 20px;
}

.place-content {
    display: flex;
    gap: 20px;
}

.image-container {
    flex: 1;
    position: relative;
}

.main-image {
    width: 100%;
    border-radius: 10px;
}

.info-container {
    flex: 1;
}

.info-item {
    margin-bottom: 15px;
}

.info-item h3 {
    font-size: 18px;
    margin-bottom: 5px;
}

.action-buttons {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.review-section {
    margin-top: 20px;
}

.review-section textarea {
    width: 100%;
    height: 100px;
    margin-top: 10px;
}

/* 추가적인 스타일링은 여기에 작성하세요 */
</style>
