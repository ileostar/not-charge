<script setup lang="ts">
import { loadBudgets, budgets, loadRecordsbymonth,recordsBymonth,records } from '@/API/loadRecords';
import { ref, reactive, onMounted, computed } from 'vue';
import { getCurrentUserId } from '@/utils/auth'; // 导入获取当前用户 ID 的工具函数

const months = reactive(['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']);
const selectMonths = ref();
const nowMonth = new Date().getMonth();
selectMonths.value = months[nowMonth];

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

// 映射对象，将月份名称转换为对应的数字
const monthMapping: Record<string, number> = {
  '一月': 0,
  '二月': 1,
  '三月': 2,
  '四月': 3,
  '五月': 4,
  '六月': 5,
  '七月': 6,
  '八月': 7,
  '九月': 8,
  '十月': 9,
  '十一月': 10,
  '十二月': 11,
};

const userId:any = getCurrentUserId(); // 获取当前用户 ID

onMounted(async () => {
  // 从本地存储中获取过期时间
  const expireTime = uni.getStorageSync('expireTime');
  const now = new Date();
  const nowYear=new Date().getFullYear()
  // 检查过期时间是否存在，并且是否已过期
  if (!expireTime || new Date(expireTime) <= now) {
    // 登录状态过期或未登录，重定向到登录页面
    uni.redirectTo({ url: '/pages/login' });
  }

  try {
    if (!userId) {
      console.error('未找到用户 ID');
      return;
    }

    const monthNumber = monthMapping[selectMonths.value];
    await loadRecordsbymonth(userId, monthNumber);
    await loadBudgets(userId);

    // 获取当前选择的年份和月份
    const currentMonth=new Date(nowYear,monthNumber+1,1).toISOString().slice(0, 7)
    const currentBudget = budgets.value.find((budget: any) => budget.date.startsWith(currentMonth));
    if (currentBudget) {
      budgetEnd.value = Number(currentBudget.amount);
    }

    updateDetailItems();
    await compare()
  } catch (error) {
    console.error('加载记录失败', error);
    console.error('获取预算失败', error);
  }
});


async function changeMonths(event: any) {
  selectMonths.value = months[event.detail.value];
  const monthNumber = monthMapping[selectMonths.value];
  if (!userId) {
    console.error('未找到用户 ID');
    return;
  }
  try {
    await loadRecordsbymonth(userId, monthNumber);
    await loadBudgets(userId);

    // 获取当前选择的月份
    const nowYear = new Date().getFullYear();
    const currentMonth = new Date(nowYear, monthNumber).toISOString().slice(0, 7);


    // 查找预算
    const currentBudget = budgets.value.find((budget: any) => budget.date.startsWith(currentMonth));
    if (currentBudget) {
      budgetEnd.value = Number(currentBudget.amount);
    } else {
      budgetEnd.value = 0; // 如果没有找到预算，则设置为0
    }


    // 重置 detailItems 和 groupedItems
    detailItems.splice(0, detailItems.length);
    haveCost.value = 0;
    for (const key in groupedItems) {
      if (groupedItems.hasOwnProperty(key)) {
        delete groupedItems[key];
      }
    }

    // 更新 detailItems 和 groupedItems
    updateDetailItems();
    await compare()
  } catch (error) {
    console.error('加载记录失败', error);
  }
}

function updateDetailItems() {
  detailItems.unshift(...recordsBymonth.value.map((record: any) => ({
    name: record.name,
    remark: record.note,
    amount: Number.parseFloat(record.amount),
    icon: record.icon,
    date: record.date.slice(0, 10),
  })));

  // 按日期降序排序 detailItems
  detailItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
}

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

// 计算本月预算已用多少（进度条）
const percent = computed(() => {
  if (budgetEnd.value === 0) {
    return 0;
  }
  return (haveCost.value / budgetEnd.value) * 100;
});

// 修改进度条颜色（当超过100%时）
const progressColor = computed(() => {
  return percent.value > 100 ? 'red' : '#f8c43d';
});

// 计算当日开销
function calculateOneDaySum(items: DetailItem[]) {
  return items.reduce((sum, item) => sum + item.amount, 0).toFixed(2);
}

// 对比上个月的数据
const thisMonthIncome = ref();
const thisMonthExpense = ref();
const lastMonthIncome = ref(0);
const lastMonthExpense = ref(0);
const therecordsBymonth = ref<any[]>([]); // 存储 API 返回的记录

const cardInfo = ref([
  {
    title: '支出',
    number: '-$0.00',
    description: '比上个月多0%',
    color: 'bg-yellow-500',
    icon: 'i-carbon:arrow-down-left',
  },
  {
    title: '收入',
    number: '+$0.00',
    description: '比上个月多0%',
    color: 'bg-green-500',
    icon: 'i-carbon:growth',
  },
]);

async function compare() {
  // 计算当前月收入和支出
  thisMonthIncome.value=detailItems.reduce((sum,item)=>item.amount>0?sum+item.amount:sum+0,0)
  thisMonthExpense.value=detailItems.reduce((sum,item)=>item.amount<0?sum+item.amount:sum+0,0)

  // 获取当前选择的月份和年份
  const now = new Date();
  const selectedMonth = now.getMonth(); // 获取当前月份索引 (0-11)
  const selectedYear = now.getFullYear();

  // 计算上个月的月份和年份
  const lastMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
  const lastMonthYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;

  //加载上个月的数据
  await loadRecordsbymonth(userId, lastMonth).then(data => {
    therecordsBymonth.value = data as any[]; // 确保 data 是数组类型
  });

  // 计算上个月收入和支出
  lastMonthIncome.value = therecordsBymonth.value.reduce((sum, item) => item.amount > 0 ? sum + item.amount : sum, 0);
  lastMonthExpense.value = therecordsBymonth.value.reduce((sum, item) => item.amount < 0 ? sum + item.amount : sum, 0);

  // 更新卡片信息
  updateCardInfo();
}

function updateCardInfo() {
  const expensePercentageChange = lastMonthExpense.value !== 0
    ? ((thisMonthExpense.value - lastMonthExpense.value) / lastMonthExpense.value * 100).toFixed(2)
    : 'N/A';
  const incomePercentageChange = lastMonthIncome.value !== 0
    ? ((thisMonthIncome.value - lastMonthIncome.value) / lastMonthIncome.value * 100).toFixed(2)
    : 'N/A';

  cardInfo.value[0].number = `-${Math.abs(thisMonthExpense.value).toFixed(2)}`;
  cardInfo.value[0].description = `比上个月${expensePercentageChange !== 'N/A' && parseFloat(expensePercentageChange) >= 0 ? '多' : '少'}${Math.abs(parseFloat(expensePercentageChange))}%`;

  cardInfo.value[1].number = `+${thisMonthIncome.value.toFixed(2)}`;
  cardInfo.value[1].description = `比上个月${incomePercentageChange !== 'N/A' && parseFloat(incomePercentageChange) >= 0 ? '多' : '少'}${Math.abs(parseFloat(incomePercentageChange))}%`;
}


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
      <BaseCards v-for="i in cardInfo" :key="i.title" flex-1 :icon="i.icon" :number="i.number" :color="i.color" :description="i.description" :title="i.title" h-21/>
    </view>
    <view rounded-lg bg="gray/30" mt-11>
      <view flex justify-between border-b-0.6 border-b-coolgray border-b-solid py-4 pl-4>
        本月预算
      </view>
      <view flex-base px-2 py-2>
        <view font-600>{{ budgetStart }}</view>
        <view font-600>{{ budgetEnd }}</view>
      </view>
      <view mb-3 px-2 py-1>
        <progress :percent="percent" :activeColor="progressColor" border-radius="25" />
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
  </view>
</template>

<style scoped>
.date {
  font-weight: bold;
  font-size: 1rem;
}
.sum {
  font-weight: bold;
  font-size: 1rem;
}
.topic {
  font-weight: 600;
  font-size: 0.875rem;
}
</style>
