<script setup lang="ts">
import Tabbar from '@/components/Tabbar.vue'

const months = reactive(['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'])
const selectMonths = ref('六月')
function changeMonths(event: any) {
  selectMonths.value = months[event.detail.value]
}
</script>

<template>
  <view class="h-full w-full bg-gray-100 container">
    <view class="header flex items-center justify-between bg-white px-6 py-4">
      <picker
        mode="selector"
        :range="months"
        @change="changeMonths"
      >
        <view class="flex items-center">
          <text text-lg font-bold>
            {{ selectMonths }}
          </text>
          <view h-8 w-8 flex items-center justify-center rounded-full>
            <span i-icon-park:down-one />
          </view>
        </view>
      </picker>
      <view flex items-center>
        <view h-8 w-8 flex items-center justify-center rounded-full bg-gray-300>
          <navigator
            url="/pages/myQRCode"
            open-type="navigate"
            hover-class="navigator-hover"
            i-icon-park:two-dimensional-code-two
          />
          <navigator
            url="/pages/scanQRCode"
            open-type="navigate"
            hover-class="navigator-hover"
            i-icon-park:scanning-two
          />
        </view>
      </view>
    </view>
  </view>
</template>

<style></style>

<route type="home" lang="json">
{}
</route>
