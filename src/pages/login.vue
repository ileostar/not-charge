<template>
  <div class="container">
    <button type="primary" @tap="getUserProfile">微信登录</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const getUserProfile = () => {
  // 用户点击后执行 getUserProfile 函数
  uni.getUserProfile({
    desc: '用于完善会员资料',
    success: (userProfileRes) => {
      console.log('用户信息:', userProfileRes.userInfo);

      // 调用微信登录接口
      uni.login({
        provider: 'weixin',
        success: (loginRes) => {
          console.log('登录成功', loginRes.code);

          // 发送请求到后端
          uni.request({
            url: 'http://localhost:3000/api/login',
            method: 'POST',
            data: {
              code: loginRes.code,
              userInfo: userProfileRes.userInfo
            },
            success: (res) => {
              console.log('后端返回的数据:', res.data);

              // 类型检查和断言
              if (typeof res.data === 'object' && res.data !== null && 'userInfo' in res.data) {
                const userInfo = res.data.userInfo;
                // 保存用户信息，比如 userId
                uni.setStorageSync('userInfo', userInfo);
                // 跳转到首页或其他页面
                uni.navigateTo({ url: '/pages/testofUser' });
              } else {
                console.error('响应数据不包含 userInfo 属性');
              }
            },
            fail: (error) => {
              console.error('登录失败:', error);
            }
          });
        },
        fail: (error) => {
          console.error('微信登录失败:', error);
        }
      });
    },
    fail: (error) => {
      console.error('获取用户信息失败:', error);
    }
  });
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
button {
  padding: 10px 20px;
  font-size: 18px;
}
</style>
