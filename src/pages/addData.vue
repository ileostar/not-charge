<script setup lang="ts">
// 九宫格图案
const items = reactive([
  { name: '房租', icon: 'i-carbon:home', color: 'text-blue' },
  { name: '学习', icon: 'i-carbon:book', color: 'text-purple' },
  { name: '购物', icon: 'i-carbon:shopping-cart-arrow-up', color: 'text-red' },
  { name: '美食', icon: 'i-carbon:restaurant', color: 'text-orange' },
  { name: '健身运动', icon: 'i-carbon:cyclist', color: 'text-green' },
  { name: '交通', icon: 'i-carbon:taxi', color: 'text-pink' },
  { name: '通讯', icon: 'i-carbon:phone', color: 'text-fuchsia' },
  { name: '医疗', icon: 'i-carbon:hospital', color: 'text-cyan' },
  { name: '其他', icon: 'i-carbon:tag-export', color: 'text-rose' },
])
// const keys = ref(['1', '2', '3', 'TODAY', '4', '5', '6', '+', '7', '8', '9', '-', '.', '0', '<-', 'DONE'])
// 选中有背景色
const selectedItem = reactive({ name: '', icon: '', color: '' })
function currentItem(item: { name: string, icon: string, color: string }) {
  selectedItem.name = item.name
  selectedItem.icon = item.icon
  selectedItem.color = item.color
}
</script>

<template>
  <view h-full min-h-screen flex flex-col bg-gray-100>
    <!-- 顶部导航栏 -->
    <view flex items-center justify-between border-b-0.6 border-b-coolgray border-b-solid py-2 shadow-sm bg="black/30">
      <view v-show="selectedItem.name" flex flex-col justify-between pl-3>
        <span :class="[selectedItem.icon, selectedItem.color]" text-size-xl />
        <input type="text" placeholder="备注" :maxlength="15" w-55 bg-black text-left>
      </view>
      <view>
        123
      </view>
    </view>
    <!-- 选择区域 -->
    <view mt- mx-3 flex-col items-center justify-start>
      <view my-5 flex justify-between gap-14 rounded-full p-4>
        <button h-7 w-25 flex items-center justify-center rounded-full bg-yellow-500 py-1 text-white>
          支出
        </button>
        <button h-7 w-25 flex items-center justify-center rounded-full bg-yellow-500 py-1 text-white>
          收入
        </button>
      </view>
      <view class="iconSelect flex flex-wrap items-center justify-evenly">
        <view v-for="(i, index) in items" :key="index" class="icon-Items my-4 flex flex-col items-center justify-center py-2" :class="{ 'bg-amber': selectedItem.name === i.name }" @click="currentItem(i)">
          <span :class="[i.icon, i.color]" text-6 />
          <text text-3 text-black>
            {{ i.name }}
          </text>
        </view>
      </view>
    </view>
    <!-- 键盘 -->
    <keyboard />
  </view>
</template>

<style scoped>
.iconSelect .Keyboard{
  align-content:space-evenly;
}
.icon-Items{
  width: 33%;
  height: 33%;
}
</style>
