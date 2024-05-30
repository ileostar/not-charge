<template>
  <view bg="grey" flex="~ col" border-box relative h-[100vh] justify-between text-center>
    <view overflow-scroll px-5 pt-20>
      <slot />
    </view>
    <Tabbar />
  </view>
</template>
