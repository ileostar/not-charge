<script setup lang="ts">
const props = defineProps(['fiexedOFair', 'frequencyOFair', 'currentMode', 'bankProps', 'currentRepaytype'])
const result = ref()
const bmiResult = ref()

// 根据当前模式选择输入框的数据
const selectMode = computed(() => {
  if (props.currentMode === 'isFixed')
    return props.fiexedOFair
  else if (props.currentMode === 'frequency')
    return props.frequencyOFair
  else
    return props.bankProps
})
/** 计算一天的总电费 */

function onedayCostfn() {
  /** 输入功率，每天使用，一度电的电费以及总电费 */
  const power = Number.parseFloat(selectMode.value[0].value) || 0
  const hours = Number.parseFloat(selectMode.value[1].value) || 0
  const rate = Number.parseFloat(selectMode.value[2].value) || 0
  if (selectMode.value == props.fiexedOFair)
    result.value = (power / 1000) * hours * rate
  else
    result.value = (power / 1136) * hours * rate

  return result.value
}

function getBMI() {
  const height = Number.parseFloat(selectMode.value[0].value) / 100 || 0
  const weight = Number.parseFloat(selectMode.value[1].value) || 0
  bmiResult.value = (weight / (height * height))

  if (selectMode.value == props.bankProps)
    return bmiResult.value.toFixed(2)

  else
    return bmiResult.value.toFixed(2)
}

function maxLengthForInput(item: any) {
  // 根据不同的输入项，设置不同的最大长度限制
  if (item.title === '输入功率（W）')
    return 5 // 限制为最多5个字符
  else if (item.title === '每天使用（h）')
    return 2 // 限制为最多2个字符
  else if (item.title === '电费（元）/度')
    return 8 // 限制为最多8个字符
  else
    return 5 // 默认限制为最多10个字符
}

/** 用ref()调用子组件方法需要暴露 */
defineExpose({
  onedayCostfn,
  getBMI,
})
</script>

<template>
  <view v-for="(i, index) in selectMode" :key="index" m-3 flex items-center justify-between>
    <span font-800>{{ i.title }}</span>
    <input v-model="i.value" type="number" :placeholder="i.placeHolder" :maxlength="maxLengthForInput(i)" border-2 border-solid text-left>
  </view>
</template>
