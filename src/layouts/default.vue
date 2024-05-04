<template>
  <view relative h-[100vh] border-box bg="grey" text-center flex="~ col" justify-between>
    <view pt-20 px-5>
      <slot/>
    </view>
    <Tabbar/>
  </view>
</template>
