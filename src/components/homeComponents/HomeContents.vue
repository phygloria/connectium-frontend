<template>
    <div class="containerBox">
        <div class="containerLine">
            <h1 class="title">오늘 우리아이랑 뭐할까?</h1>
            <div class="contentsContainer">
                <div class="contentsBar">
                    <div v-for="(item, index) in contentsItems" :key="index" class="contentsImg">
                        <div class="image-container">
                            <img class="contents" :src="item.src" @click="goToContents(item.route)"
                                :alt="`Content ${index + 1}`" />
                            <div class="image-text">{{ item.text }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const contentsItems = ref([
    { src: new URL('@/assets/images/home/contents (1).jpg', import.meta.url).href, route: '/community', text: '우리아이 커뮤니티' },
    { src: new URL('@/assets/images/home/contents (2).jpg', import.meta.url).href, route: '/program', text: '몸으로 놀아요' },
    { src: new URL('@/assets/images/home/contents (3).jpg', import.meta.url).href, route: '/education', text: '즐겁게 공부하자' },
    { src: new URL('@/assets/images/home/contents (4).jpg', import.meta.url).href, route: '/outdoor/park', text: '신나는 우리동네' },
]);

const goToContents = (route) => {
    router.push(route);
};
</script>





<style scoped>
.containerBox {
    padding: 1% calc((100% - var(--main-content-width)) / 2);
}

.containerLine {
    width: 100%;
    box-shadow: 0px 3px 7px #DBFA5F;
    border-radius: 50px;
    border: 2px #90ce2d solid;
    height: auto;
    min-height: 350px;
    padding: 10px;
    display: flex;
    flex-direction: column;
}

.title {
    position: relative;
    right: 10%;
    color: #242424;
    font-size: 50px;
    font-family: 'MangoByeolbyeol', sans-serif;
    font-weight: 400;
    word-wrap: break-word;
}


.image-container {
    position: relative;
    overflow: hidden;
}

.image-text {
    position: absolute;
    bottom: 5%;
    right: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    /* 그림자 추가 */
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 20px;
    font-weight: bold;
    font-family: "Pretendard-Regular";
}



.contentsContainer {
    display: flex;
    justify-content: center;
}

.contentsBar {
    justify-content: center;
    max-width: 1240px;
    display: flex;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    gap: 10px;

}

.contentsImg {
    flex: 0 0 auto;
}

.contents {
    width: 255px;
    height: 200px;
    border-radius: 20px;
    transition: transform 0.3s ease;
    cursor: pointer;
    object-fit: cover;
}

.contents:hover {
    transform: scale(1.0);
}






/* 반응형 스타일 */


@media (max-width: 1240px) {

    .title {
        font-size: 45px;
    }

    .contentsImg {
        flex: 0 0 calc(40% - 7px);
        /* 두 개씩 줄바꿈을 위해 너비를 50%로 설정 */
        max-width: calc(40% - 7px);
    }

    .contents {
        width: 90%;
        /* 부모 요소의 전체 너비를 사용 */
    }




}

@media (min-width: 1024px) {
    .contentsImg {
        max-width: calc(40% - 7px);
    }
}



@media (max-width: 800px) {
    .contents {
        width: 200px;
        height: 160px;
    }

    .title {
        font-size: 30px;
    }

    .contentsImg {
        max-width: calc(50% - 5px);
    }

    .image-text {
        font-size: 15px;
    }
}


/* 매우 작은 화면에 대한 대응 */
@media (max-width: 480px) {
    .title {
        font-size: 25px;
        right: 5%;
        /* 타이틀 위치 조정 */
    }

    .contentsBar {
        flex-direction: column;
        /* 세로 정렬 */
        align-items: center;
        /* 중앙 정렬 */
    }

    .contentsImg {
        max-width: 100%;
        /* 전체 너비 사용 */
        width: 100%;
        /* 전체 너비 사용 */
    }

    .contents {
        width: 100%;
        /* 부모 요소의 전체 너비 사용 */
        height: auto;
        /* 높이 자동 조정 */
        max-height: 160px;
        /* 최대 높이 설정 */
        object-fit: cover;
        /* 이미지 비율 유지 */
    }

    .image-text {
        font-size: 15px;
    }

}


@media (max-width: 418px) {

    .image-container {
        border-radius: 40px;
    }

    .contents {
        border-radius: 40px;
    }

}
</style>