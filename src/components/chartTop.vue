<script setup lang="ts">
const currentType=ref('expense')
const currentTime=ref('week')
const emit = defineEmits(['choseTypes']);

function changeToexpense(){
  currentType.value = 'expense'
  emit('choseTypes','expense')
}
function changeToincome(){
  currentType.value = 'income'
  emit('choseTypes','income')
}

</script>

<template>
  <view flex flex-col items-center justify-center bg="#f8c43d">
    <view text-lg font-800>图表</view>
    <view flex items-center justify-around w-100%  text-white>
      <view border-solid m-2 rounded-2 flex items-center justify-around border-2>
        <span p-2 b-r-solid :class="currentType === 'expense' ? 'bg-rose-4' : ' '"
        @click="changeToexpense">支出</span>
        <span p-2  :class="currentType === 'income' ? 'bg-rose-4' : ''" @click="changeToincome">收入</span>
      </view>
      <view border-solid  m-2 rounded-2 w-50% flex items-center justify-around border-2>
        <span p-2 w-33% b-r-solid :class="currentTime === 'week' ? 'bg-rose-4' : ' '" @click="currentTime = 'week'">周</span>
        <span p-2 w-33% b-r-solid :class="currentTime === 'month' ? 'bg-rose-4' : ' '" @click="currentTime = 'month'">月</span>
        <span p-2 w-33%  :class="currentTime === 'year' ? 'bg-rose-4' : ' '" @click="currentTime = 'year'">年</span>
      </view>
    </view>
  </view>
</template>

<style>

</style>
