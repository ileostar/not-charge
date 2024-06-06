<script setup lang="ts">
const props = defineProps(['items', 'currentItem', 'selectedItem'])
</script>

<template>
  <view class="iconSelect flex flex-wrap items-center justify-evenly">
    <view v-for="(i, index) in props.items" :key="index" class="icon-Items my-4 flex flex-col items-center justify-center py-2" :class="{ 'bg-amber': props.selectedItem.name === i.name }" @click="currentItem(i)">
      <span :class="[i.icon, i.color]" text-6 />
      <text text-3 text-black>
        {{ i.name }}
      </text>
    </view>
  </view>
</template>

<style>
.iconSelect {
  align-content:space-evenly;
}
.icon-Items{
  width: 33%;
  height: 33%;
}
</style>
