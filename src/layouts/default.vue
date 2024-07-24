<script setup lang="ts">
// 检查用户登录状态
const showTabbar = ref(false);

const checkLoginStatus = () => {
  const expireTime = uni.getStorageSync('expireTime');
  if (expireTime) {
    const now = new Date();
    if (new Date(expireTime) > now) {
      showTabbar.value = true;
    } else {
      showTabbar.value = false;
    }
  }
};

onMounted(() => {
  checkLoginStatus();
});
</script>

<template>
  <view class="h-[100vh]" flex="~ col" border-box relative justify-between text-center>
    <view overflow-scroll px-5 pt-20 class="bg-[#F4F5F7]" h-100%>
      <slot />
    </view>
    <Tabbar v-if="showTabbar"/>
  </view>
</template>

