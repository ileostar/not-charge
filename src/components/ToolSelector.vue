<template>
  <view flex flex-col items-center justify-center bg="#f8c43d">
    <view text-lg font-800>计算小工具</view>
    <view class="border-solid m-2 rounded-2 flex items-center justify-center bg-coolgray overflow-hidden w-90%">
      <span class="flex-1 text-center p-2" :class="currentType === 'air' ? 'bg-rose-400' : ''" @click="changeTools('air')">空调电费</span>
      <span class="flex-1 text-center p-2" :class="currentType === 'bank' ? 'bg-rose-400' : ''" @click="changeTools('bank')">BMI标准计算器</span>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  currentType: String
});

const emit = defineEmits(['changeTools']);
const localCurrentType = ref(props.currentType);

watch(() => props.currentType, (newVal) => {
  localCurrentType.value = newVal;
});

function changeTools(type: string) {
  emit('changeTools', type);
}
</script>

<style scoped>
/* Add your styles here if needed */
</style>
