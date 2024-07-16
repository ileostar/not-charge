<template>
  <view class="h-[100vh]" flex="~ col" border-box relative justify-between text-center>
    <view overflow-scroll px-5 pt-20 class="bg-[#F4F5F7]" h-100%>
      <slot />
    </view>
    <Tabbar />
  </view>
</template>
