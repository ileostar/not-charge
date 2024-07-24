<script setup lang="ts">
function getUserProfile() {
  // 用户点击后执行 getUserProfile 函数
  uni.getUserProfile({
    desc: '获取你的昵称、头像、地区及性别',
    success: (userProfileRes) => {
      // 调用微信登录接口
      uni.login({
        provider: 'weixin',
        success: (loginRes) => {
          // 发送请求到后端
          uni.request({
            url: 'http://localhost:3000/api/login',
            method: 'POST',
            data: {
              code: loginRes.code,
              userInfo: userProfileRes.userInfo,
            },
            success: (res) => {
              // 类型检查和断言
              if (typeof res.data === 'object' && res.data !== null && 'userInfo' in res.data) {
                const userInfo = res.data.userInfo
                // 设置登录过期时间为7天后
                const now = new Date()
                const expireTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7天后过期
                // 保存用户信息，比如 userId
                uni.setStorageSync('userInfo', userInfo)
                // 保存用户登录过期时间
                uni.setStorageSync('loginTime', now.toISOString())
                uni.setStorageSync('expireTime', expireTime.toISOString())
                // 跳转到首页或其他页面
                uni.reLaunch({ url: '/pages/index' })
              }
              else {
                console.error('响应数据不包含 userInfo 属性')
              }
            },
            fail: (error) => {
              console.error('登录失败:', error)
            },
          })
        },
        fail: (error) => {
          console.error('微信登录失败:', error)
        },
      })
    },
    fail: (error) => {
      console.error('获取用户信息失败:', error)
    },
  })
}
</script>

<template>
  <div class="container">
    <button type="primary" @tap="getUserProfile">
      微信登录
    </button>
  </div>
</template>

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
