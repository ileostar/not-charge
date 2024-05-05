<script setup lang="ts">
function getActionClass(param: string) {
  const routes = getCurrentPages()
  return routes[routes.length - 1].route?.split('/')[1] === param ? 'color-green text-7 mb-5' : 'mb-5'
}
</script>

<template>
  <view text="6.5" bg="white/10" border-box h-23 w-full flex items-center justify-around rd-5>
    <navigator :class="getActionClass('index')" url="/pages/index" mb-5>
      <span i-carbon:home />
    </navigator>
    <navigator :class="getActionClass('report')" url="/pages/report" mb-5>
      <span i-carbon:ibm-secure-infrastructure-on-vpc-for-regulated-industries />
    </navigator>
    <navigator :class="getActionClass('user')" url="/pages/user" mb-5>
      <span i-carbon:user />
    </navigator>
  </view>
</template>
