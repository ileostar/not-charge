<script setup lang="ts">

const getActionClass = (param: string)=>{
  const routes = getCurrentPages()
  console.log(routes[routes.length - 1].route?.split('/')[1])
  return routes[routes.length - 1].route?.split('/')[1]===param ?'color-green text-7 mb-5':'mb-5'
}
</script>

<template>
  <view border-box h-23 w-full flex text="6.5" justify-around items-center bg="white/10" rd-5>
    <navigator :class="getActionClass('index')" url="/pages/index" mb-5>
      <span i-carbon:home/>
    </navigator>
    <navigator :class="getActionClass('report')" url="/pages/report" mb-5>
      <span i-carbon:ibm-secure-infrastructure-on-vpc-for-regulated-industries/>
    </navigator>
    <navigator :class="getActionClass('user')" url="/pages/user" mb-5>
      <span i-carbon:user/>
    </navigator>
  </view>
</template>
