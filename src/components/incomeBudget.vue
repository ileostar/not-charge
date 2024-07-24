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

</script>

