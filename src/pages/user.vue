<script setup lang="ts">

</script>

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
      <button class="sign-in-button h-6 w-9 rounded-full bg-yellow-500 px-4 py-2 text-white">
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
      <navigator url="/pages/accountManagement" class="block flex items-center justify-between border-b border-gray-200 border-b-style-solid px-4 py-3">
        <view class="flex items-center">
          <span class="icon iconify" i-icon-park:notebook-and-pen />
          <text class="ml-1.25">
            账本管理
          </text>
        </view>
        <span i-icon-park:go-end />
      </navigator>
      <navigator url="/pages/importAccount" class="block flex items-center justify-between border-b border-gray-200 border-b-style-solid px-4 py-3">
        <view class="flex items-center">
          <span class="icon iconify" i-icon-park:file-addition />
          <text class="ml-1.25">
            账本导入
          </text>
        </view>
        <span i-icon-park:go-end />
      </navigator>
      <navigator url="/pages/budget" class="block flex items-center justify-between border-b border-gray-200 border-b-style-solid px-4 py-3">
        <view class="flex items-center">
          <span class="icon iconify" i-icon-park:financing-one />
          <text class="ml-1.25">
            我的预算
          </text>
        </view>
        <span i-icon-park:go-end />
      </navigator>
      <navigator url="/pages/bankCards" class="block flex items-center justify-between border-b border-gray-200 border-b-style-solid px-4 py-3">
        <view class="flex items-center">
          <span class="icon iconify" i-icon-park:bank-card />
          <text class="ml-1.25">
            银行卡
          </text>
        </view>
        <span i-icon-park:go-end />
      </navigator>
      <navigator url="/pages/reminders" class="block flex items-center justify-between border-b border-gray-200 border-b-style-solid px-4 py-3">
        <view class="flex items-center">
          <span class="icon iconify" i-icon-park:alarm-clock />
          <text class="ml-1.25">
            定时提醒
          </text>
        </view>
        <span i-icon-park:go-end />
      </navigator>
      <navigator url="/pages/salaryCalculator" class="block flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <view class="flex items-center">
          <span class="icon iconify" i-icon-park:calculator-one />
          <text class="ml-1.25">
            工资计算器
          </text>
        </view>
        <span i-icon-park:go-end />
      </navigator>
    </view>

    <!-- 下部分 -->
    <view class="bottom-section mt-2 bg-white">
      <navigator url="/pages/gestureLock" class="block flex items-center justify-between border-b border-gray-200 border-b-style-solid px-4 py-3">
        <view class="flex items-center">
          <span class="icon iconify" i-icon-park:electronic-locks-close />
          <text class="ml-1.25">
            手势密码
          </text>
        </view>
        <span i-icon-park:go-end />
      </navigator>
      <navigator url="/pages/about" class="block flex items-center justify-between border-b border-gray-200 border-b-style-solid px-4 py-3">
        <view class="flex items-center">
          <span class="icon iconify" i-icon-park:trumpet />
          <text class="ml-1.25">
            关于
          </text>
        </view>
        <span i-icon-park:go-end />
      </navigator>
      <navigator url="/pages/settings" class="block flex items-center justify-between px-4 py-3">
        <view class="flex items-center">
          <span class="icon iconify" i-icon-park:setting />
          <text class="ml-1.25">
            设置
          </text>
        </view>
        <span i-icon-park:go-end />
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
