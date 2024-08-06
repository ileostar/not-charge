<script setup lang="ts">
import { onMounted, ref } from 'vue'
import IncomeBudget from '@/components/incomeBudget.vue'
import { budgets, loadBudgets } from '@/API/loadRecords'

interface Budget {
  id: number
  amount: number
  date: string
}

const getbudgets = ref<Budget[]>([])
const showModal = ref(false)
const isEditMode = ref(false)
const budgetAmount = ref<number | null>(null)
const budgetDate = ref<string | null>(null)
const currentEditIndex = ref<number | null>(null)

function openModal(amount: number | null = null, date: string | null = null, index: number | null = null) {
  budgetAmount.value = amount
  budgetDate.value = date
  currentEditIndex.value = index
  isEditMode.value = amount !== null
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  budgetAmount.value = null
  budgetDate.value = null
  currentEditIndex.value = null
}

function handleDateChange(event: any) {
  budgetDate.value = event.detail.value
}

async function saveBudget() {
  if (budgetAmount.value !== null && budgetDate.value !== null) {
    // 从本地存储中获取 userId
    const userInfo = uni.getStorageSync('userInfo')
    if (!userInfo || !userInfo.id) {
      console.error('User ID not found in local storage')
      return
    }
    const userId = userInfo.id

    const newBudget = {
      userId, // 添加 userId 参数
      amount: budgetAmount.value,
      date: budgetDate.value,
    }

    try {
      let res
      if (isEditMode.value && currentEditIndex.value !== null) {
        // 编辑模式，发送 PUT 请求
        const id = getbudgets.value[currentEditIndex.value].id
        res = await uni.request({
          url: `http://localhost:3000/api/budgets/${id}`,
          method: 'PUT',
          data: newBudget,
        })

        const responseData = res.data

        if (res.statusCode === 200 && responseData && typeof responseData === 'object' && 'id' in responseData) {
          getbudgets.value[currentEditIndex.value] = { ...newBudget, id } // 更新现有条目
          closeModal()
        }
        else {
          console.error('更新预算失败', res)
        }
      }
      else {
        // 新增模式，发送 POST 请求
        res = await uni.request({
          url: 'http://localhost:3000/api/budgets',
          method: 'POST',
          data: newBudget,
        })

        const responseData = res.data

        if (res.statusCode === 200 && responseData && typeof responseData === 'object' && 'id' in responseData) {
          getbudgets.value.unshift({ ...newBudget, id: responseData.id }) // 新增条目
          closeModal()
        }
        else {
          console.error('保存预算失败', res)
        }
      }
    }
    catch (error) {
      console.error('保存预算失败', error)
    }
  }
}

onMounted(async () => {
  try {
    // 从本地存储中获取 userInfo
    const userInfo = uni.getStorageSync('userInfo')
    if (!userInfo || !userInfo.id) {
      console.error('User ID not found in local storage')
      return
    }
    const userId = userInfo.id

    // 调用 loadBudgets 函数并传递 userId 参数
    await loadBudgets(userId)
    getbudgets.value = budgets.value
  }
  catch (error) {
    console.error('加载预算失败', error)
  }
})
</script>

<template>
  <view class="h-full min-h-screen flex flex-col bg-gray-100">
    <view class="mb-4 flex items-center">
      <view class="text-lg">
        预算设置
      </view>
      <view class="ml-4 text-xs text-green-500" @click="openModal()">
        新增预算
      </view>
    </view>
    <view class="mb-4 text-sm text-gray-500">
      点击可以进行编辑，删除。
    </view>

    <IncomeBudget :budgets="getbudgets" @edit="openModal" />

    <view v-if="showModal" class="fixed left-0 top-0 z-1000 h-full w-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]" @click="closeModal">
      <view class="w-2/3 rounded bg-white p-4" @click.stop>
        <view class="mb-4 flex items-center">
          <view class="mr-2 h-2 w-2 rounded-full bg-green-500" />
          <view class="text-xl">
            {{ isEditMode ? '修改预算信息' : '新增预算信息' }}
          </view>
        </view>
        <view class="mb-4 flex flex-col">
          <label for="budget-date">日期</label>
          <picker mode="date" fields="month" @change="handleDateChange">
            <view class="mt-2 border border-gray-300 rounded p-2">
              {{ budgetDate }}
            </view>
          </picker>
        </view>
        <view class="mb-4 flex flex-col">
          <label for="budget-amount">预算金额</label>
          <input id="budget-amount" v-model="budgetAmount" type="number" class="mt-2 border border-gray-300 rounded p-2" placeholder="请输入预算金额">
        </view>
        <button class="w-full rounded bg-green-500 p-2 text-white" @click="saveBudget">
          确定
        </button>
      </view>
    </view>
  </view>
</template>
