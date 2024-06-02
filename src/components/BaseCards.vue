<script setup lang="ts">
const props = defineProps(['title', 'number', 'description', 'color', 'icon'])
</script>

<template>
  <view :class="props.color" flex="~ col" gap="0.2" h-full items-start justify-between rounded-lg py-2 pl-4 pr-2 shadow-xl>
    <view w-full flex justify-between>
      <text text-4>
        {{ props.title }}
      </text>
      <span :class="props.icon" />
    </view>
    <view flex justify-between text-size-xl font-bold>
      {{ props.number }}
    </view>
    <view flex justify-between text-4>
      {{ props.description }}
    </view>
  </view>
</template>
