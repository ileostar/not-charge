<script setup lang="ts">
import { ref } from 'vue'

const theType = defineProps(['currentOFtype'])
const emit = defineEmits(['result', 'save', 'changecVisit'])
const input = ref('')
const displayinput = ref<string>('')
const Savebutton = ref('保存')
let OperatorStart = false

function NumberCk(key: string) {
  if (key === '.') {
    const segments = displayinput.value.split(/[\+\-]/)
    const lastSegment = segments[segments.length - 1]
    if (lastSegment.includes('.'))
      return
  }
  if (displayinput.value === '' && (key === '+' || key === '-'))
    return
  input.value += key
  displayinput.value += key
  emit('result', displayinput.value) // 确保传递字符串
  OperatorStart = false
}

function Operator(operator: string) {
  if (displayinput.value === '' || displayinput.value.endsWith('+') || displayinput.value.endsWith('-'))
    return
  if (OperatorStart) {
    displayinput.value = Calculation(displayinput.value)
    displayinput.value += operator
    emit('result', displayinput.value) // 确保传递字符串
  }
  else {
    displayinput.value = Calculation(displayinput.value)
    displayinput.value += operator
    OperatorStart = true
    Savebutton.value = '='
    emit('result', displayinput.value) // 确保传递字符串
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
    emit('result', displayinput.value) // 确保传递字符串
    OperatorStart = false
  }
  else {
    const result = Calculation(displayinput.value)
    if (theType.currentOFtype === 'income') {
      displayinput.value = result
    }
    else {
      const numericResult = Number.parseFloat(result)

      if (!Number.isNaN(numericResult)) {
        displayinput.value = (-numericResult).toString()
      }
      else {
        displayinput.value = '0'
        console.error('Invalid input:', result)
      }
    }
    emit('save', displayinput.value) // 确保传递字符串
    displayinput.value = ''
    emit('result', displayinput.value) // 确保传递字符串
    emit('changecVisit', false)
  }
}

function Calculation(money: string): string {
  if (money.includes('-') && money.indexOf('-') !== 0)
    return `${accSub(Number.parseFloat(money.split('-')[0] || '0'), Number.parseFloat(money.split('-')[1] || '0'))}`
  else if (money.includes('+'))
    return `${accAdd(Number.parseFloat(money.split('+')[0] || '0'), Number.parseFloat(money.split('+')[1] || '0'))}`
  else if (money.indexOf('-') === 0 && money.split('-')[2])
    return `${accSub(Number.parseFloat(`-${money.split('-')[1] || '0'}`), Number.parseFloat(money.split('-')[2] || '0'))}`
  else
    return `${Number.parseFloat(money)}`
}

function deleteText() {
  if (displayinput.value.length > 1) {
    displayinput.value = displayinput.value.slice(0, -1)
    emit('result', displayinput.value) // 确保传递字符串
  }
  else {
    displayinput.value = '0'
    emit('result', displayinput.value) // 确保传递字符串
  }
}
</script>

<template>
  <view>
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
