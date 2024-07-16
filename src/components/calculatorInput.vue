<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue';

const props = defineProps(['fiexedOFair', 'frequencyOFair', 'currentMode']);
const emit = defineEmits(['getonedayCost']);

const selectMode = computed(() => {
  return props.currentMode === 'isFixed' ? props.fiexedOFair : props.frequencyOFair;
});

/**计算一天的总电费 */
const onedayCost = computed(() => {
  const power = parseFloat(selectMode.value[0].value) || 0;
  const hours = parseFloat(selectMode.value[1].value) || 0;
  const rate = parseFloat(selectMode.value[2].value) || 0;
  if(selectMode.value==='isFixed'){
    return (power / 1000) * hours * rate;
  }else{
    return (power / 1136) * hours * rate;
  }
});

// 计算并通过事件传递结果
const calculateCost = () => {
  emit('getonedayCost', onedayCost.value);
};

// 将方法暴露给父组件
export { calculateCost };
</script>

<template>
  <view flex items-center justify-between m-3 v-for="(i, index) in selectMode" :key="index">
    <span font-800>{{ i.title }}</span>
    <input v-model="i.value" type="number" :placeholder="i.placeHolder" text-left border-solid border-2>
  </view>
</template>
