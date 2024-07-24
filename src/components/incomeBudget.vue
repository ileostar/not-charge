<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'

const props = defineProps({
  budgets: Array as () => Array<{ amount: number, date: string }>,
})

const emits = defineEmits(['edit'])

const startX = ref(0)
const startY = ref(0)
const touchMoved = ref(false)

function editBudget(amount: number, date: string, index: number) {
  emits('edit', amount, date, index) // 将点击预算条目时的金额和日期传递给父组件
}

function formattedDate(date: string) {
  return date
    ? new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
    })
    : ''
}
</script>

<template>
  <view class="mb-4 bg-blue">
    <view v-for="(budget, index) in props.budgets" :key="index" class="flex items-center justify-between border-b border-amber-500 border-solid py-3">
      <view>{{ formattedDate(budget.date) }}</view>
      <view @click="editBudget(budget.amount, budget.date, index)">
        ￥{{ budget.amount }} >
      </view>
    </view>
  </view>
</template>
