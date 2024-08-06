<script setup lang="ts">
const emit = defineEmits(['choseTypes', 'selectLimitdate'])
const currentType = ref('expense')
const currentTime = ref('week')
function changeToexpense() {
  currentType.value = 'expense'
  emit('choseTypes', 'expense')
}
function changeToincome() {
  currentType.value = 'income'
  emit('choseTypes', 'income')
}
function changeLimitdate(type: string) {
  currentTime.value = type

  emit('selectLimitdate', type)
}
</script>

<template>
  <view flex flex-col items-center justify-center bg="#f8c43d">
    <view text-lg font-800>
      图表
    </view>
    <view w-100% flex items-center justify-around text-white>
      <view m-2 flex items-center justify-around overflow-hidden rounded-2 border-solid>
        <span
          b-r-solid p-2 :class="currentType === 'expense' ? 'bg-rose-4' : ' '"
          @click="changeToexpense"
        >支出</span>
        <span p-2 :class="currentType === 'income' ? 'bg-rose-4' : ''" @click="changeToincome">收入</span>
      </view>
      <view m-2 w-50% flex items-center justify-around overflow-hidden rounded-2 border-solid>
        <span w-33% b-r-solid p-2 :class="currentTime === 'week' ? 'bg-rose-4' : ' '" @click="changeLimitdate('week')">周</span>
        <span w-33% b-r-solid p-2 :class="currentTime === 'month' ? 'bg-rose-4' : ' '" @click="changeLimitdate('month')">月</span>
        <span w-33% p-2 :class="currentTime === 'year' ? 'bg-rose-4' : ' '" @click="changeLimitdate('year')">年</span>
      </view>
    </view>
  </view>
</template>

<style>

</style>
