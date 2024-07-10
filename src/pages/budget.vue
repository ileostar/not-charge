<script setup lang="ts">
import { ref } from 'vue';
import IncomeBudget from '@/components/incomeBudget.vue';
import { loadBudgets } from '@/API/loadRecords';


const budgets = ref<Array<{ amount: number, date: string }>>([]); // 存放预算列表的数组
const showModal = ref(false);
const isEditMode = ref(false);
const budgetAmount = ref<number | null>(null);
const budgetDate = ref<string | null>(null);
const currentEditIndex = ref<number | null>(null);

const openModal = (amount: number | null = null, date: string | null = null, index: number | null = null) => {
  budgetAmount.value = amount;
  budgetDate.value = date;
  currentEditIndex.value = index;
  isEditMode.value = amount !== null;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  console.log(budgets);

};

const handleDateChange = (event: any) => {
  budgetDate.value = event.detail.value;
};

const saveBudget = () => {
  if (budgetAmount.value !== null && budgetDate.value !== null) {
    const newBudget = {
      amount: budgetAmount.value,
      date: budgetDate.value
    };

    // 发送请求保存数据
    uni.request({
      url: 'http://localhost:3000/api/budgets',
      method: 'POST',
      data: newBudget,
      success: (res) => {
        if (res.statusCode === 200) {
          if (isEditMode.value && currentEditIndex.value !== null) {
            budgets.value[currentEditIndex.value] = newBudget; // 修改现有条目
            console.log("修改现有条目",budgets);

          } else {
            budgets.value.unshift(newBudget); // 新增条目
            console.log("新增条目",budgets);

          }
          // 更新本地存储
    uni.setStorageSync('budgets', JSON.stringify(budgets.value));
          closeModal();
        } else {
          console.error('保存预算失败', res);
        }
      },
      fail: (error) => {
        console.error('保存预算失败', error);
      }
    });
  }
};




// 加载本地存储中的预算数据
onMounted(() => {
  const savedBudgets = uni.getStorageSync('budgets');
  if (savedBudgets) {
    budgets.value = JSON.parse(savedBudgets);
  }
});


</script>

<template>
  <view class="h-full min-h-screen flex flex-col bg-gray-100">
    <view class="flex items-center mb-4">
      <view class="text-lg">预算设置</view>
      <view class="text-xs text-green-500 ml-4" @click="openModal()">新增预算</view>
    </view>
    <view class="text-sm text-gray-500 mb-4">点击可以进行编辑，删除。</view>

    <IncomeBudget @edit="openModal" :budgets="budgets"/>

    <view v-if="showModal" class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-1000" @click="closeModal">
      <view class="bg-white w-2/3 rounded p-4" @click.stop>
        <view class="flex items-center mb-4">
          <view class="bg-green-500 w-2 h-2 rounded-full mr-2"></view>
          <view class="text-xl">{{ isEditMode ? '修改预算信息' : '新增预算信息' }}</view>
        </view>
        <view class="flex flex-col mb-4">
          <label for="budget-date">日期</label>
          <picker mode="date" @change="handleDateChange" fields="month">
            <view class="mt-2 p-2 border border-gray-300 rounded">{{ budgetDate }}</view>
          </picker>
        </view>
        <view class="flex flex-col mb-4">
          <label for="budget-amount">预算金额</label>
          <input type="number" id="budget-amount" v-model="budgetAmount" class="mt-2 p-2 border border-gray-300 rounded" placeholder="请输入预算金额" />
        </view>
        <button class="bg-green-500 text-white p-2 rounded w-full" @click="saveBudget">确定</button>
      </view>
    </view>
  </view>
</template>
