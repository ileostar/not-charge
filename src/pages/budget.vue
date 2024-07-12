<script setup lang="ts">
import { ref, onMounted } from 'vue';
import IncomeBudget from '@/components/incomeBudget.vue';
import { loadBudgets, budgets } from '@/API/loadRecords';

interface Budget {
  id: number;
  amount: number;
  date: string;
}

const getbudgets = ref<Budget[]>([]);
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
  budgetAmount.value = null;
  budgetDate.value = null;
  currentEditIndex.value = null;
};

const handleDateChange = (event: any) => {
  budgetDate.value = event.detail.value;
};

const saveBudget = async () => {
  if (budgetAmount.value !== null && budgetDate.value !== null) {
    const newBudget = {
      amount: budgetAmount.value,
      date: budgetDate.value
    };

    try {
      let res;
      if (isEditMode.value && currentEditIndex.value !== null) {
        // 编辑模式，发送 PUT 请求
        const id = getbudgets.value[currentEditIndex.value].id;
        res = await uni.request({
          url: `http://localhost:3000/api/budgets/${id}`,
          method: 'PUT',
          data: newBudget
        });

        const responseData = res.data;

        if (res.statusCode === 200 && responseData && typeof responseData === 'object' && 'id' in responseData) {
          getbudgets.value[currentEditIndex.value] = { ...newBudget, id }; // 更新现有条目
          closeModal();
        } else {
          console.error('更新预算失败', res);
        }
      } else {
        // 新增模式，发送 POST 请求
        res = await uni.request({
          url: 'http://localhost:3000/api/budgets',
          method: 'POST',
          data: newBudget
        });

        const responseData = res.data;

        if (res.statusCode === 200 && responseData && typeof responseData === 'object' && 'id' in responseData) {
          getbudgets.value.unshift({ ...newBudget, id: responseData.id }); // 新增条目
          closeModal();
        } else {
          console.error('保存预算失败', res);
        }
      }
    } catch (error) {
      console.error('保存预算失败', error);
    }
  }
};




onMounted(async () => {
  try {
    await loadBudgets();
    getbudgets.value = budgets.value;
  } catch (error) {
    console.error('加载预算失败', error);
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

    <IncomeBudget @edit="openModal" :budgets="getbudgets"/>

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
