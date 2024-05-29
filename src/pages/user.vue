<template>
  <view class="profile-container h-full w-full bg-gray-100">
    <!-- 上部分 -->
    <view class="top-section flex items-center justify-between bg-white p-5">
      <view class="flex items-center">
        <image class="user-avatar rounded-full" src="../static/vite.png" mode="aspectFill" />
        <view class="ml-4">
          <text class="font-bold">
            阿木木
          </text>
          <text class="block text-gray-500">
            记账让我自律
          </text>
        </view>
      </view>
      <button class="sign-in-button w-15 rounded-r-full bg-yellow-500 px-4 py-2 text-white">
        签到
      </button>
    </view>

    <!-- 统计信息 -->
    <view class="stats-section mt-2 flex justify-around bg-white py-4">
      <view class="text-center">
        <text class="block font-bold">
          10
        </text>
        <text class="text-gray-500">
          打卡总天数
        </text>
      </view>
      <view class="text-center">
        <text class="block font-bold">
          21
        </text>
        <text class="text-gray-500">
          记账总天数
        </text>
      </view>
      <view class="text-center">
        <text class="block font-bold">
          80
        </text>
        <text class="text-gray-500">
          记账总笔数
        </text>
      </view>
    </view>

    <!-- 中间部分 -->
    <view class="middle-section mt-2 bg-white">
      <navigator url="/pages/accountManagement" class="block flex items-center border-b border-gray-200 px-4 py-3">
        <text>账本管理</text>
      </navigator>
      <navigator url="/pages/importAccount" class="block flex items-center border-b border-gray-200 px-4 py-3">
        <text>账本导入</text>
      </navigator>
      <navigator url="/pages/budget" class="block flex items-center border-b border-gray-200 px-4 py-3">
        <text>我的预算</text>
      </navigator>
      <navigator url="/pages/bankCards" class="block flex items-center border-b border-gray-200 px-4 py-3">
        <text>银行卡</text>
      </navigator>
      <navigator url="/pages/reminders" class="block flex items-center border-b border-gray-200 px-4 py-3">
        <text>定时提醒</text>
      </navigator>
      <navigator url="/pages/salaryCalculator" class="block flex items-center border-b border-gray-200 px-4 py-3">
        <text>工资计算器</text>
      </navigator>
    </view>

    <!-- 下部分 -->
    <view class="bottom-section mt-2 bg-white">
      <navigator url="/pages/gestureLock" class="block flex items-center border-b border-gray-200 px-4 py-3">
        <text>手势密码</text>
      </navigator>
      <navigator url="/pages/about" class="block flex items-center border-b border-gray-200 px-4 py-3">
        <text>关于</text>
      </navigator>
      <navigator url="/pages/settings" class="block flex items-center px-4 py-3">
        <text>设置</text>
      </navigator>
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
  min-width: 70px;
  border-radius: 9999px; /* 半圆按钮 */
}
</style>
