<script setup lang="ts">
const emit = defineEmits(['result','save','changecVisit'])
const input = ref('')
let OperatorStart = false
const Savebutton = ref('保存')
const displayinput: Ref<string> = ref('')
function NumberCk(key: string) {
  if (key === '.') {
    // 获取最后一个操作数
    const segments = displayinput.value.split(/[\+\-]/)
    const lastSegment = segments[segments.length - 1]
    // 只有在最后一个操作数中没有小数点时，才允许输入小数点
    if (lastSegment.includes('.'))
      return
  }

  if (displayinput.value === '' && (key === '+' || key === '-'))
    return

  input.value += key
  displayinput.value += key
  emit('result', displayinput)
  OperatorStart = false // Reset operator start flag on number input
}

function Operator(operator: string) {
  // 如果输入为空，或以 + 或 - 结尾，则返回
  if (displayinput.value === '' || displayinput.value.endsWith('+') || displayinput.value.endsWith('-'))
    return

  // 如果 OperatorStart 标志为 true，说明前面已经有一个操作符
  if (OperatorStart) {
    // 计算当前表达式的值
    displayinput.value = Calculation(displayinput.value)
    // 添加新的操作符
    displayinput.value += operator
    emit('result', displayinput)
  }
  else {
    // 计算当前表达式的值
    displayinput.value = Calculation(displayinput.value)
    // 添加新的操作符
    displayinput.value += operator
    // 将 OperatorStart 标志设为 true，表示已经输入了一个操作符
    OperatorStart = true
    // 更新按钮的文本为 '='，表示可以进行求和操作
    Savebutton.value = '='
    emit('result', displayinput)
  }
}

function sum() {
  if (Savebutton.value === '=') {
    try {
      displayinput.value = Calculation(displayinput.value)
    }
    catch (e) {
      displayinput.value = 'error'
    }
    input.value = ''
    Savebutton.value = '保存'
    emit('result', displayinput)
    OperatorStart = false
  }
  else {
    emit('save', displayinput)
    displayinput.value = ''
    emit('result', displayinput)
    emit('changecVisit',false)
  }
}

function Calculation(money: string): string {
  if (money.includes('-') && money.indexOf('-') !== 0) { // 减
    return `${accSub(Number.parseFloat(money.split('-')[0] || '0'), Number.parseFloat(money.split('-')[1] || '0'))}`
  }
  else if (money.includes('+')) { // 加
    return `${accAdd(Number.parseFloat(money.split('+')[0] || '0'), Number.parseFloat(money.split('+')[1] || '0'))}`
  }
  else if (money.indexOf('-') === 0 && money.split('-')[2]) { // 减
    return `${accSub(Number.parseFloat(`-${money.split('-')[1] || '0'}`), Number.parseFloat(money.split('-')[2] || '0'))}`
  }
  else {
    return `${Number.parseFloat(money)}`
  }
}
function deleteText() {
  if (displayinput.value.length > 1) {
    displayinput.value = displayinput.value.slice(0, -1)
    emit('result', displayinput)
  }

  else {
    displayinput.value = '0'
    emit('result', displayinput)
  }
}
</script>

<template>
  <view>
    <!-- <view class="uni-input Numberinput" border-blue border-solid>
      <text bg-pink text-black>
        {{ displayinput }}
      </text>
      <text class="myfous" />
    </view> -->

    <view class="mybrankmask">
      <view style="padding: 20rpx;">
        <view class="MymaskList">
          <view class="maskListItem" text-black @click="NumberCk('1')">
            1
          </view>
          <view class="maskListItem" text-black @click="NumberCk('2')">
            2
          </view>
          <view class="maskListItem" text-black @click="NumberCk('3')">
            3
          </view>
          <view class="maskListItem" style="background-color: #FFA500;color: #fff;" @click="deleteText">
            删除
          </view>
        </view>
        <view class="MymaskList">
          <view class="maskListItem" text-black @click="NumberCk('4')">
            4
          </view>
          <view class="maskListItem" text-black @click="NumberCk('5')">
            5
          </view>
          <view class="maskListItem" text-black @click="NumberCk('6')">
            6
          </view>
          <view class="maskListItem" style="background-color: #67C23A;color: #fff;" @click="Operator('+')">
            +
          </view>
        </view>
        <view class="MymaskList">
          <view class="maskListItem" text-black @click="NumberCk('7')">
            7
          </view>
          <view class="maskListItem" text-black @click="NumberCk('8')">
            8
          </view>
          <view class="maskListItem" text-black @click="NumberCk('9')">
            9
          </view>
          <view class="maskListItem" style="background-color: #F56C6C;color: #fff;" @click="Operator('-')">
            -
          </view>
        </view>
        <view class="MymaskList">
          <view class="maskListItem" text-black @click="NumberCk('0')">
            0
          </view>
          <view class="maskListItem" text-black @click="NumberCk('.')">
            .
          </view>
          <view class="maskListItem" style="background-color: #31BDEC;color: #fff;width: 48%;" @click="sum">
            {{ Savebutton }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style>
.Numberinput {
  display: flex;
  align-items: center;
}
.myfous {
  width: 1rpx;
  height: 41rpx;
  background-color: #000;
  display: block;
  animation: mytreat 1.5s linear infinite;
}
.mybrankmask {
  width: 100%;
  height: 470rpx;
  background-color: #EBEEF5;
  position: fixed;
  z-index: 999;
  left: 0;
  bottom: 0;
}
.mybrankmask .MymaskList {
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 20rpx;
}
.mybrankmask .MymaskList .maskListItem {
  width: 23%;
  height: 90rpx;
  background-color: #fff;
  text-align: center;
  line-height: 90rpx;
  border-radius: 10rpx;
}
</style>
