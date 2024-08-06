<script setup lang="ts">
const currentType = ref('air')
const currentMode = ref('isFixed')
const currentRepaytype = ref('china')
/** 保留两位小数临时变量和计算结果 */
const temp = ref()
const totalAmount = ref()
/** BMI的结果 */
const theBMIresult = ref()
/** 输入框的内容区域 */
const fiexedOFair = reactive([
  { title: '输入功率（W）', placeHolder: '请输入输入功率(W)', value: '' },
  { title: '每天使用（h）', placeHolder: '请输入每天使用（h）', value: '' },
  { title: '电费（元）/度', placeHolder: '输入一度电的费用', value: '' },
])

const frequencyOFair = reactive([
  { title: '制冷季节耗电量', placeHolder: '请输入制冷季节耗电量', value: '' },
  { title: '每天使用（h）', placeHolder: '请输入每天使用（h）', value: '' },
  { title: '电费（元）/度', placeHolder: '输入一度电的费用', value: '' },
])

// BMI模式下的数据
const bankProps = reactive([
  { title: '身高（CM）', placeHolder: '请输入身高', value: '' },
  { title: '体重（KG）', placeHolder: '请输入体重', value: '' },
])

// 根据BMI值获取身体状况
function getBMIStatus(bmi: number): string {
  if (currentRepaytype.value === 'china') {
    if (bmi < 18.5)
      return '偏瘦'
    else if (bmi >= 18.5 && bmi < 24)
      return '正常'
    else if (bmi >= 24 && bmi < 28)
      return '偏胖'
    else
      return '肥胖'
  }
  else {
    if (bmi < 18.5)
      return '体重过轻'
    else if (bmi >= 18.5 && bmi < 24.9)
      return '正常体重'
    else if (bmi >= 25 && bmi < 29.9)
      return '超重'
    else if (bmi >= 30 && bmi < 34.9)
      return 'Ⅰ度肥胖'
    else if (bmi >= 35 && bmi < 39.9)
      return 'ⅠⅠ度肥胖'
    else
      return 'ⅠⅠⅠ度肥胖（极度肥胖）'
  }
}

// 根据BMI值获取相关疾病发病危险性
function getBMIRisk(bmi: number): string {
  if (bmi < 18.5)
    return '低'
  else if (bmi >= 18.5 && bmi < 24)
    return '正常'
  else if (bmi >= 24 && bmi < 28)
    return '增加'
  else
    return '高'
}

/** 改变小工具 */
function handleChangeTools(type: string) {
  currentType.value = type
  if (type === 'air') {
    currentMode.value = 'isFixed'
    fiexedOFair.forEach(item => item.value = '')
    frequencyOFair.forEach(item => item.value = '')
    totalAmount.value = ''
  }
  else {
    currentMode.value = ''
    currentRepaytype.value = 'china'
    bankProps.forEach(item => item.value = '')
  }
}
/** 改变空调模式并input清零 */
function changeMode(type: string) {
  currentMode.value = type
  // 清空输入框的值
  fiexedOFair.forEach(item => item.value = '')
  frequencyOFair.forEach(item => item.value = '')
  bankProps.forEach(item => item.value = '')
  totalAmount.value = ''
}

function changeBanktypes(type: string) {
  currentRepaytype.value = type
  // 清空输入框的值
  bankProps.forEach(item => item.value = '')
  theBMIresult.value = ''
}

/** 计算一天电费的开销 */
const airRef = ref()
const BMIRef = ref()
function getResult() {
  temp.value = airRef.value.onedayCostfn()
  /** 保留两位小数 */
  totalAmount.value = Math.floor(temp.value * 100) / 100
}
function getBMIResult() {
  theBMIresult.value = BMIRef.value.getBMI()
}
</script>

<template>
  <view flex flex-col>
    <tool-selector :current-type="currentType" @change-tools="handleChangeTools" />
    <view v-if="currentType === 'air'">
      <!-- 空调电费内容 -->
      <calculator-input ref="airRef" :fiexed-o-fair="fiexedOFair" :frequency-o-fair="frequencyOFair" :current-mode="currentMode" />
      <view m-3 flex items-center justify-between>
        <span font-800>选择空调模式</span>
        <view class="m-2 w-45% flex overflow-hidden rounded-2 border-solid bg-coolgray">
          <span class="flex-1 justify-end p-2 text-center" :class="currentMode === 'isFixed' ? 'bg-rose-400' : ''" @click="changeMode('isFixed')">定频</span>
          <span class="flex-1 justify-end p-2 text-center" :class="currentMode === 'frequency' ? 'bg-rose-400' : ''" @click="changeMode('frequency')">变频</span>
        </view>
      </view>
      <view mt-5>
        <button bg-green-5 @click="getResult">
          开始计算！
        </button>
        <view v-if="totalAmount" mt-4 border-blue-6 border-solid>
          您计算的电费是{{ totalAmount }}元
        </view>
      </view>
    </view>
    <!-- BMI模式 -->
    <view v-else-if="currentType === 'bank'">
      <!-- 通过计算小工具组件来展示BMI内容 -->
      <CalculatorInput ref="BMIRef" :bank-props="bankProps" :current-repaytype="currentRepaytype" />
      <view m-3 flex items-center justify-between>
        <span font-800>参考标准</span>
        <view class="m-2 w-47% flex overflow-hidden rounded-2 border-solid bg-coolgray">
          <span class="flex-1 justify-end p-2 text-center" :class="currentRepaytype === 'china' ? 'bg-rose-400' : ''" @click="changeBanktypes('china')">中国标准</span>
          <span class="flex-1 justify-end p-2 text-center" :class="currentRepaytype === 'international' ? 'bg-rose-400' : ''" @click="changeBanktypes('international')">国际标准</span>
        </view>
      </view>
      <view mt-5>
        <button bg-green-5 @click="getBMIResult">
          开始计算！
        </button>
        <!-- 根据BMI结果显示 -->
        <view v-if="theBMIresult" mt-4 border-blue-6 border-solid>
          <span>BMI: {{ theBMIresult }}</span><br>
          <span>身体状况: {{ getBMIStatus(theBMIresult) }}</span><br>
          <span>相关疾病发病危险性: {{ getBMIRisk(theBMIresult) }}</span>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
/* Add your styles here if needed */
</style>
