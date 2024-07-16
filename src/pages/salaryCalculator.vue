<script setup lang="ts">
const currentType = ref('air')
const currentMode=ref('isFixed')
/**输入功率，每天使用，一度电的电费以及总电费 */
const inputPower=ref()
const dailyUse=ref()
const electricCost=ref()
const totalAmount=ref()

const fiexedOFair=reactive([
  {title:'输入功率（W）',placeHolder:'请输入输入功率(W)',value:''},
  {title:'每天使用（h）',placeHolder:'请输入每天使用（h）',value:''},
  {title:'电费（元）/度',placeHolder:'输入一度电的费用',value:''},
])

const frequencyOFair=reactive([
  {title:'制冷季节耗电量',placeHolder:'请输入制冷季节耗电量',value:''},
  {title:'每天使用（h）',placeHolder:'请输入每天使用（h）',value:''},
  {title:'电费（元）/度',placeHolder:'输入一度电的费用',value:''},
])

function changeTools(type:string){
  currentType.value=type
}
function changeMode(type:string){
  currentMode.value=type
}
/**计算一天电费的开销 */
const gotoThecost=(msg:number)=>{
  totalAmount.value=msg
}
</script>

<template>
  <view flex flex-col>
    <view flex flex-col items-center justify-center bg="#f8c43d">
      <view text-lg font-800>计算小工具</view>
      <view
        class="border-solid m-2 rounded-2  flex items-center justify-center bg-coolgray overflow-hidden w-90%">
        <span class="flex-1 text-center p-2" :class="currentType === 'air' ? 'bg-rose-400' : ''"  @click="changeTools('air')">空调电费</span>
        <span class="flex-1 text-center p-2" :class="currentType === 'bank' ? 'bg-rose-400' : ''"  @click="changeTools('bank')">银行贷款</span>
      </view>
    </view>
    <view>
      <view flex flex-col mt-3>
        <calculatorInput :fiexedOFair="fiexedOFair" :frequencyOFair="frequencyOFair" :currentMode="currentMode"/>
        <view flex items-center justify-between m-3>
          <span font-800>选择空调模式</span>
          <view class="border-solid m-2 rounded-2  flex  bg-coolgray  overflow-hidden w-45%">
        <span class="flex-1 text-center p-2 justify-end" :class="currentMode === 'isFixed' ? 'bg-rose-400' : ''"  @click="changeMode('isFixed')">定频</span>
        <span class="flex-1 text-center p-2 justify-end" :class="currentMode === 'frequency' ? 'bg-rose-400' : ''"  @click="changeMode('frequency')">变频</span>
          </view>
        </view>
      </view>
    </view>
    <view mt-5>
      <button bg-green-5  >开始计算！</button>
    </view>
  </view>

</template>

<style>
</style>
