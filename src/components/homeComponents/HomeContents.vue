<template>
<div class="containerBox">
    <div class="containerLine">

        <h1 class="title">오늘 우리아이랑 뭐할까?</h1>

        <div class="contentsContainer">
            <div class="contentsBar">
                <div v-for="(item, index) in contentsItems" :key="index" class="contentsImg">
                    <img 
                        class="contents" 
                        :src="item.src" 
                        @click="goToContents(item.route)" 
                        :alt="`Content ${index + 1}`"
                    />
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
    { src: new URL('@/assets/images/home/contents (1).jpg', import.meta.url).href, route: '/postList' },
    { src: new URL('@/assets/images/home/contents (2).jpg', import.meta.url).href, route: '/postEdit' },
    { src: new URL('@/assets/images/home/contents (3).jpg', import.meta.url).href, route: '/postCreate' },
    { src: new URL('@/assets/images/home/contents (4).jpg', import.meta.url).href, route: '/postView' },
]);

const goToContents = (route) => {
    router.push(route);
};
</script>

<style scoped>
.containerBox {
    padding: 0 30px 20px 30px;
}

.containerLine {
    width: 100%; box-shadow: 0px 3px 7px #DBFA5F; border-radius: 50px; border: 2px #8CD000 solid; 
    height: auto; min-height: 330px;
    padding: 10px;
    display: flex;
    flex-direction: column;  
}

.title {
    position: relative;
    right: 14%;
    color: #242424;
    font-size: 50px;
    font-family: 'MangoByeolbyeol', sans-serif;
    font-weight: 400;
    word-wrap: break-word;
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

@media (max-width: 1024px) {
  .contents {
    width: 250px;
    height: 200px;
  }
}

@media (max-width: 768px) {
  .contents {
    width: 200px;
    height: 160px;
  }
}

</style>