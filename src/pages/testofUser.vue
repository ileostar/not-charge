<template>
  <div>
    <h1>Welcome, {{ userInfo && userInfo.nickname }}</h1>
    <img v-if="userInfo" :src="userInfo.avatar_url" alt="User Avatar">
    <!-- 其他展示用户信息的地方 -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const userInfo = ref<any>(null); // 定义一个 ref 用于保存用户信息

onMounted(() => {
  // 在组件加载后从本地存储或 Vuex 中获取用户信息
  userInfo.value = uni.getStorageSync('userInfo');
});
</script>

<style scoped>
/* 样式 */
</style>
