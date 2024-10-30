<template>
  <div class="bodyContainer">
    <div class="bodyImageBar" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <transition-group name="fade" tag="div">
        <img v-for="(image, index) in images" :key="image" v-show="currentIndex === index" :src="image"
          class="homeImage" alt="Home carousel image" />
      </transition-group>
      <div class="imageText">
        <h2>깜짝 놀랄걸요?</h2>
        <p>우리동네에 이런 곳이 있었다니!!!</p>
      </div>
      <div class="arrowContainer">
        <div class="arrowBar">
          <div class="arrow left-arrow" @click="prevImage"></div>
          <div class="arrow right-arrow" @click="nextImage"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import image1 from "@/assets/images/home/MaskImage (1).png";
import image2 from "@/assets/images/home/MaskImage (2).png";
import image3 from "@/assets/images/home/MaskImage (3).png";
import image4 from "@/assets/images/home/MaskImage (4).png";

const images = [image2, image1, image4, image3];

const currentIndex = ref(0);

const touchStartX = ref(0);
const touchEndX = ref(0);

const rotateImages = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
};

const nextImage = rotateImages;

const touchStart = (event) => {
  touchStartX.value = event.touches[0].clientX;
};

const touchMove = (event) => {
  touchEndX.value = event.touches[0].clientX;
};

const touchEnd = () => {
  if (touchStartX.value - touchEndX.value > 50) {
    // 왼쪽으로 스와이프
    nextImage();
  } else if (touchEndX.value - touchStartX.value > 50) {
    // 오른쪽으로 스와이프
    prevImage();
  }
};

onMounted(() => {
  setInterval(rotateImages, 7000);
});
</script>

<style scoped>
.bodyContainer {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 1% 1% 0 calc((100% - var(--main-content-width)) / 2);
}

.bodyImageBar {
  max-width: var(--main-content-width);
  height: 400px;
  left: 0px;
  top: 0px;
  position: relative;
  background: #d9d9d9;
  border-radius: 70px;
  overflow: hidden;
  box-shadow: 0px 3px 7px #dbfa5f;
  touch-action: pan-y;
  /* Y축 스크롤은 허용하고 X축 스와이프만 캡처 */
}

.homeImage {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 70px;
}

.imageText {
  position: absolute;
  top: 70%;
  right: 15%;
  color: white;
  text-align: right;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.imageText h2 {
  font-family: "MangoByeolbyeol";
  font-size: 2.5em;
  line-height: 1.2;
  /* 행간 추가 */
  margin-bottom: 0.2em;
  /* 아래 여백 추가 */
}

.imageText p {
  font-family: "MangoByeolbyeol";
  font-size: 2.5em;
  line-height: 1.2;
  /* 행간 추가 */
  margin-top: 0;
  /* 위 여백 제거 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.arrowContainer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  /* 이미지 클릭을 방해하지 않도록 */
}

.arrowBar {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 5%;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  cursor: pointer;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  pointer-events: auto;
  /* 화살표 클릭 가능하도록 */
}

.left-arrow {
  left: 10%;
  /* arrowBar의 padding과 일치 */
  border-right: 25px solid #ffffff;
}

.right-arrow {
  right: 10%;
  /* arrowBar의 padding과 일치 */
  border-left: 25px solid #ffffff;
}

/* 화살표에 호버 효과 추가 */
.left-arrow:hover {
  border-right-color: #a3d600;
}

.right-arrow:hover {
  border-left-color: #a3d600;
}

/* 소형 데스크탑: 992px-1199px */
@media (max-width: 1199px) {
  .bodyImageBar {
    height: 300px;
    border-radius: 50px;
  }

  .homeImage {
    border-radius: 50px;
  }

  .arrow {
    top: 50%;
  }

  .left-arrow {
    left: 10%;
  }

  .right-arrow {
    right: 10%;
  }

  .imageText {
    position: absolute;
    top: 70%;
    right: 16%;
    font-size: 70%;
  }
}

/* 태블릿: 870px-991px */
@media (max-width: 991px) {
  .bodyImageBar {
    height: 250px;
    border-radius: 40px;
  }

  .homeImage {
    border-radius: 40px;
  }

  .imageText {
    top: 65%;
  }

  .imageText h2 {
    font-size: 2em;
  }

  .imageText p {
    font-size: 2em;
  }
}

/* 대형 모바일: 576px-869px */
@media (max-width: 869px) {

  .bodyImageBar {
    height: 200px;
    border-radius: 20px;
  }

  .homeImage {    
    border-radius: 20px;
  }
  
  
}

/* 소형 모바일 */
@media (max-width: 575px) {
  .arrowContainer {
    display: none;
  }
  
  .bodyImageBar {
    position: relative;
    border-radius: 10px;
  }
  
  .homeImage {
    border-radius: 10px;
    object-fit: cover;
  }

  
  .imageText {
  display: none;
}


/* 텍스트 오버레이 */
.bodyImageBar::after {
  content: "아이랑 자유롭게 \A 이어지는 우리 중랑";
  position: absolute;
  
  /* 위치 조정 (예: 중앙 정렬) */
  left: 50%;
  top: 75%;
  transform: translate(-50%, -50%);
  
  /* 텍스트 스타일링 */
  font-family: "MangoByeolbyeol";
  color: white;
  font-size: 25px;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 0.2em;
  white-space: pre;  /* 줄바꿈을 위해 필요 */
  text-align: center;  /* 텍스트 중앙 정렬 */

    /* 선택사항: 텍스트 가독성을 위한 효과 */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

}
</style>
