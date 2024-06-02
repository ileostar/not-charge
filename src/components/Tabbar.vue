<script setup lang="ts">
function getActionClass(param: string) {
  const routes = getCurrentPages()
  return routes[routes.length - 1].route?.split('/')[1] === param ? 'color-green text-7 mb-5' : 'mb-5'
}

function switchPage(url: string) {
  uni.redirectTo({
    url,
    animationType: 'fade-in',
    animationDuration: 200,
  })
}
</script>

<template>
  <view text="6.5" bg="white/10" border-box fixed bottom-0 z-99 h-23 w-full flex items-center justify-around rd-5>
    <view :class="getActionClass('index')" mb-5 @click="switchPage('/pages/index')">
      <span i-carbon:home />
    </view>
    <view :class="getActionClass('visual')" mb-5 @click="switchPage('/pages/visual')">
      <span i-carbon:intrusion-prevention />
    </view>
    <view class="add-button" :class="getActionClass('addData')" mb-5 text-8 @click="switchPage('/pages/addData') ">
      <span i-carbon:add-filled />
    </view>
    <view :class="getActionClass('gpt')" mb-5 @click="switchPage('/pages/gpt')">
      <span i-carbon:bot />
    </view>
    <view :class="getActionClass('user')" mb-5 @click="switchPage('/pages/user')">
      <span i-carbon:user />
    </view>
  </view>
</template>

<style scoped>
.add-button {
  position: relative;
  top: -43px; /* 向上移动一部分高度，使其突出 */
}
</style>
