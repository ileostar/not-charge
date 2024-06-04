<script setup lang="ts">
const props = defineProps(['url', 'title', 'icon'])
</script>

<template>
  <navigator :url="props.url" class="block flex items-center justify-between border-b border-gray-200 border-b-style-solid py-3 text-black">
    <view class="flex items-center">
      <span :class="props.icon" />
      <text ml-1.25 flex items-center justify-between>
        {{ props.title }}
      </text>
    </view>
    <span i-icon-park:go-end />
  </navigator>
</template>
