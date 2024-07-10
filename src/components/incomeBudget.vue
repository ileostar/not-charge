<template>
  <view class="bg-blue mb-4">
    <view class="flex items-center justify-between py-3 border-b border-solid border-amber-500" v-for="(budget, index) in props.budgets" :key="index"
    >
      <view>{{ formattedDate(budget.date) }}</view>
      <view @click="editBudget(budget.amount, budget.date, index)">￥{{ budget.amount }} ></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  budgets: Array as () => Array<{ amount: number, date: string }>,
});

const emits = defineEmits(['edit']);

const startX = ref(0);
const startY = ref(0);
const touchMoved = ref(false);

const editBudget = (amount: number, date: string, index: number) => {
  emits('edit', amount, date, index); // 将点击预算条目时的金额和日期传递给父组件
};

const formattedDate = (date: string) => {
  return date ? new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
  }) : '';
};

const handleTouchStart = (index: number, event: TouchEvent) => {
  startX.value = event.touches[0].clientX;
  startY.value = event.touches[0].clientY;
  touchMoved.value = false;
};

const handleTouchMove = (index: number, event: TouchEvent) => {
  const deltaX = event.touches[0].clientX - startX.value;
  const deltaY = event.touches[0].clientY - startY.value;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // 水平移动大于垂直移动时，认定为滑动操作
    touchMoved.value = true;
  }
};

const handleTouchEnd = (index: number) => {
  if (touchMoved.value) {
    // 如果发生了滑动操作，执行删除逻辑
    deleteBudget(index);
  }
};

const deleteBudget = (index: number) => {
  // 触发删除操作，可以向父组件 emit 一个事件，或者直接在这里处理删除逻辑
  console.log('删除预算', index);
  // 假设 budgets 是响应式数据，在实际项目中需要修改 budgets 数组
  // 如：budgets.value.splice(index, 1);
};
</script>

