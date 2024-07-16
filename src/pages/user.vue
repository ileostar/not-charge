<script setup lang="ts">
const userSelectOption = reactive([
  { url: '/pages/accountManagement', title: '账本管理', icon: ' i-icon-park:notebook-and-pen' },
  { url: '/pages/importAccount', title: '账本导入', icon: 'i-icon-park:file-addition' },
  { url: '/pages/budget', title: '我的预算', icon: 'i-icon-park:financing-one' },
  { url: '/pages/bankCards', title: '银行卡', icon: 'i-icon-park:bank-card' },
  { url: '/pages/reminders', title: '定时提醒', icon: 'i-icon-park:alarm-clock ' },
  { url: '/pages/salaryCalculator', title: '工资计算器', icon: 'i-icon-park:calculator-one ' },

])

const userSelectOption2 = reactive([
  { url: '/pages/gestureLock', title: '手势密码', icon: 'i-icon-park:electronic-locks-close ' },
  { url: '/pages/about', title: '关于', icon: 'i-icon-park:trumpet ' },
  { url: '/pages/settings', title: '设置', icon: 'i-icon-park:setting ' },
])

</script>

<template>
  <view class="profile-container h-full w-full">
    <!-- 上部分 -->
    <view class="top-section flex items-center justify-between">
      <view class="flex items-center">
        <image class="user-avatar rounded-full" src="../static/user.jpg" mode="aspectFill" />
        <view class="ml-4">
          <text class="text-black font-bold">
            阿木木
          </text>
          <text class="block text-gray-500">
            记账让我自律
          </text>
        </view>
      </view>
      <button class="sign-in-button h-6 w-9 rounded-full bg-yellow-500 py-2 text-white">
        签到
      </button>
    </view>

    <!-- 统计信息 -->
    <view class="stats-section mt-2 flex justify-around py-4">
      <view class="text-center">
        <text class="block color-black font-bold">
          10
        </text>
        <text text-gray-500>
          打卡总天数
        </text>
      </view>
      <view text-center>
        <text class="block color-black font-bold">
          21
        </text>
        <text text-gray-500>
          记账总天数
        </text>
      </view>
      <view text-center>
        <text class="block color-black font-bold">
          80
        </text>
        <text text-gray-500>
          记账总笔数
        </text>
      </view>
    </view>

    <!-- 中间部分 -->
    <view class="middle-section mt-2">
      <UserSelect v-for="(i, index) in userSelectOption" :key="index" :title="i.title" :url="i.url" :icon="i.icon" />
    </view>

    <!-- 下部分 -->
    <view class="bottom-section mt-2 pb-23">
      <UserSelect v-for="(i, index) in userSelectOption2" :key="index" :title="i.title" :url="i.url" :icon="i.icon"/>
    </view>
  </view>
</template>

<style scoped>
.profile-container {
  padding-top: env(safe-area-inset-top); /* 适配刘海屏等安全区域 */
}
.user-avatar {
  width: 55px;
  height: 55px;
}
.sign-in-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 70px;
  border-radius: 9999px; /* 半圆按钮 */
  font-size: 15px
}
.iconify {
  color: #f8c43d; /* 默认颜色，可以根据需要修改 */
}
</style>
