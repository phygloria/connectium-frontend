<template>

    <MainTop />
    <br>
    <HomeBody />
    <br>
    <div class="home-contents">
        <HomeContents />
    </div>

</template>

<script setup>
import MainTop from '@/components/MainTop.vue';
import HomeBody from '@/components/homeComponents/HomeBody.vue';
import HomeContents from '@/components/homeComponents/HomeContents.vue';


</script>


<style scoped>
@media (max-width: 1024px) {
    .home-contents {
        position: absolute;
        top: 97%;
    }
}
</style>