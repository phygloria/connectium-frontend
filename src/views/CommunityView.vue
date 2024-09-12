<template>
    <div class="community">
      <MainTop />
      <br>
      <CommunityList />
      <br>
      <CommunityContents />
    </div>
  </template>
  
  <script setup>
  import MainTop from '@/components/MainTop.vue';
  import CommunityList from '@/components/communityComponents/CommunityList.vue'
  
  </script>
  
  <style scoped>
  .community {
    /* 필요한 스타일 추가 */
  }
  </style>