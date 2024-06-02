<template>
  <view class="h-[100vh]" bg="grey" flex="~ col" border-box relative justify-between text-center>
    <view overflow-scroll px-5 pt-20>
      <slot />
    </view>
    <Tabbar />
  </view>
</template>
