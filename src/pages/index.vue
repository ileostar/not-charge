<script setup lang="ts">
import { loadRecords, records, loadBudgets, budgets } from '@/API/loadRecords';
import { ref, reactive, onMounted, computed } from 'vue';

const months = reactive(['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']);
const selectMonths = ref('六月');

const budgetStart = ref(0); // 初始化为0
const budgetEnd = ref(0);
const haveCost = ref(0);

interface DetailItem {
  name: string;
  remark: string;
  amount: number;
  icon: string;
  date: string;
}

const detailItems = reactive<DetailItem[]>([]);
const groupedItems = reactive<Record<string, DetailItem[]>>({});

onMounted(async () => {
  try {
    await loadRecords();
    await loadBudgets();

    const currentMonth = new Date().toISOString().slice(0, 7); // 获取当前年份和月份

    const currentBudget = budgets.value.find((budget: any) => budget.date.startsWith(currentMonth));

    console.log('这是预算currentBudget',currentBudget);


    if (currentBudget) {
      budgetEnd.value = Number(currentBudget.amount);
    }
    console.log('这是预算budgetEnd',budgetEnd);
    detailItems.unshift(...records.value.map((record: any) => ({
      name: record.name,
      remark: record.note,
      amount: Number.parseFloat(record.amount),
      icon: record.icon,
      date: record.date.slice(0, 10),
    })));

    // 按日期降序排序 detailItems
    detailItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    console.log('这是detailItems',detailItems);

    // 计算总开销
    detailItems.forEach((item) => {
      haveCost.value += item.amount;
    });
    // 按日期分组数据
    detailItems.forEach((item) => {
      if (!groupedItems[item.date]) {
        groupedItems[item.date] = [];
      }
      groupedItems[item.date].unshift(item);
    });
  } catch (error) {
    console.error('加载记录失败', error);
    console.error('获取预算失败', error);
  }

});

const themeColors: Record<string, string> = {
  房租: 'bg-blue',
  学习: 'bg-purple-500',
  购物: 'bg-red',
  美食: 'bg-orange',
  健身运动: 'bg-green',
  交通: 'bg-pink',
  通讯: 'bg-fuchsia',
  其他: 'bg-rose',
  医疗: 'bg-cyan',
  理财: 'bg-blue',
  工资: 'bg-purple',
  零花钱: 'bg-cyan',
  兼职: 'bg-orange',
};

function changeMonths(event: any) {
  selectMonths.value = months[event.detail.value];
}

// 计算本月预算已用多少（进度条）
const percent = computed(() => {
  if (budgetEnd.value === 0) {
    return 0;
  }
  return (haveCost.value / budgetEnd.value) * 100;
});


//修改进度条颜色（当超过100%时）
const progressColor  = computed(() => {
  return percent.value > 100 ? 'red' : '#f8c43d';
});

//计算当日开销
function calculateOneDaySum(items: DetailItem[]) {
  return items.reduce((sum, item) => sum + item.amount, 0).toFixed(2);
}

const cardInfo = ref([
  {
    title: '支出',
    number: '-$2482.00',
    description: '比上个月多5%',
    color: 'bg-yellow-500',
    icon: 'i-carbon:arrow-down-left',
  },
  {
    title: '收入',
    number: '+$8482.00',
    description: '比上个月多15%',
    color: 'bg-green-500',
    icon: 'i-carbon:growth',
  },
]);
</script>

<template>
  <view h-full w-full container>
    <header flex items-center justify-between py-4 dark:bg-black>
      <picker mode="selector" :range="months" @change="changeMonths">
        <view class="flex items-center">
          <text text-lg text-black font-bold>{{ selectMonths }}</text>
          <view h-8 w-8 flex items-center justify-center rounded-full>
            <span i-icon-park:down-one />
          </view>
        </view>
      </picker>
      <view flex items-center>
        <view h-8 flex items-center justify-between rounded-full>
          <navigator url="/pages/myQRCode" open-type="navigate" hover-class="navigator-hover" i-icon-park:two-dimensional-code-two mr-4 />
          <navigator url="/pages/scanQRCode" open-type="navigate" hover-class="navigator-hover" i-icon-park:scanning-two />
        </view>
      </view>
    </header>
    <view gap="2.5" my-4 h-20 w-full flex items-center text-white>
      <BaseCards v-for="i in cardInfo" :key="i.title" flex-1 :icon="i.icon" :number="i.number" :color="i.color" :description="i.description" :title="i.title" />
    </view>
    <view rounded-lg bg="gray/30">
      <view flex justify-between border-b-0.6 border-b-coolgray border-b-solid py-4 pl-4>
        本月预算
      </view>
      <view flex-base px-2 py-2>
        <view font-600>{{ budgetStart }}</view>
        <view font-600>{{ budgetEnd }}</view>
      </view>
      <view mb-3 px-2 py-1>
        <progress :percent="percent" :activeColor=progressColor  border-radius="25" />
      </view>
    </view>
    <view v-for="(items, date) in groupedItems" :key="date" mb-2 bg="gray/30" rounded-lg>
      <view flex items-center justify-between py-4>
        <view class="date">{{ date }}</view>
        <view class="sum" text-size-4>{{ calculateOneDaySum(items) }}</view>
      </view>
      <view v-for="(item, index) in items" :key="index" flex items-center justify-between border-t-0.6 border-t-coolgray border-t-solid>
        <view flex items-center justify-between py-2>
          <view h-10 w-10 rounded-full :class="themeColors[item.name]">
            <span :class="item.icon" h-10 text-size-2xl text-light />
          </view>
          <view class="topic flex flex-col justify-center pl-2.5">
            <text mb-1 flex font-600>{{ item.name }}</text>
            <text text-size-xs text-bluegray font-300>{{ item.remark }}</text>
          </view>
        </view>
        <view text-size-4>{{ item.amount > 0 ? `+${item.amount.toFixed(2)}` : item.amount.toFixed(2) }}</view>
      </view>
    </view>
    <view h-2 />
  </view>
</template>

<route type="home" lang="json">
  {}
</route>
