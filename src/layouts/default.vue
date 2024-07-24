<script setup lang="ts">
// 检查用户登录状态
const showTabbar = ref(false)

function checkLoginStatus() {
  const expireTime = uni.getStorageSync('expireTime')
  if (expireTime) {
    const now = new Date()
    if (new Date(expireTime) > now)
      showTabbar.value = true
    else
      showTabbar.value = false
  }
}

onMounted(() => {
  checkLoginStatus()
})
</script>

<template>
  <view class="h-[100vh]" flex="~ col" border-box relative justify-between text-center>
    <view class="bg-[#F4F5F7]" h-100% overflow-scroll px-5 pt-20>
      <slot />
    </view>
    <Tabbar v-if="showTabbar" />
  </view>
</template>
