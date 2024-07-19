<template>
  <view container bg-gray-100>
    <ChartTop @choseTypes="choseType" @selectLimitdate="selectLimittime" />
    <view class="charts-box" mt-10 h-full>
    <qiun-data-charts
      type="line"
      :opts="opts"
      :chartData="chartData"
    />
    </view>
  </view>

</template>

<script setup>
import { ref } from 'vue';
import { loadRecords, records } from '@/API/loadRecords';
import useCurrentWeekRange from '@/composables/useGetdate';
const { currentWeek, currentMonthRange, currentYearRange } = useCurrentWeekRange();

// 响应式数据
const chartData = ref({});
const currentType = ref('expense');
const timePeriod = ref('week'); // 默认显示周数据

// 图表配置项
const opts = ref({
  color: ["#1890FF", "#91CB74",],
  padding: [15, 10, 0, 15],
  enableScroll: false,
  legend: {},
  xAxis: {
    disableGrid: true,
    labelCount: 13 , // 显示的标签数量
    label: {
      interval: 0, // 强制显示所有数据点
    },
  },
  yAxis: {
    gridType: "dash",
    dashLength: 2
  },
  extra: {
    line: {
      type: "straight",
      width: 2,
      activeType: "hollow"
    }
  }
});

// 初始化周数据
const weekCost = ref({
  monday: 0,
  tuesday: 0,
  wednesday: 0,
  thursday: 0,
  friday: 0,
  saturday: 0,
  sunday: 0,
});

const weekIncome = ref({
  monday: 0,
  tuesday: 0,
  wednesday: 0,
  thursday: 0,
  friday: 0,
  saturday: 0,
  sunday: 0,
});

// 初始化月数据
const monthCost = ref([]);
const monthIncome = ref([]);

// 初始化年数据
const yearCost = ref([]);
const yearIncome = ref([]);

// 选择类型函数
function choseType(type) {
  currentType.value = type;
  updateChartData();
}

// 选择时间段函数
function selectLimittime(period) {
  timePeriod.value = period;
  updateChartData();
}

// 更新图表数据
function updateChartData() {
  let categories = [];
  let seriesData = [];

  if (timePeriod.value === 'week') {
    const weekData = currentType.value === 'income' ? weekIncome.value : weekCost.value;
    categories = [
      currentWeek.value.monday.split('-')[2],
      currentWeek.value.tuesday.split('-')[2],
      currentWeek.value.wednesday.split('-')[2],
      currentWeek.value.thursday.split('-')[2],
      currentWeek.value.friday.split('-')[2],
      currentWeek.value.saturday.split('-')[2],
      currentWeek.value.sunday.split('-')[2]
    ];
    seriesData = [
      weekData.monday,
      weekData.tuesday,
      weekData.wednesday,
      weekData.thursday,
      weekData.friday,
      weekData.saturday,
      weekData.sunday
    ];
  } else if (timePeriod.value === 'month') {
    categories = currentMonthRange.value.days;
    seriesData = currentType.value === 'income' ? monthIncome.value : monthCost.value;
  } else if (timePeriod.value === 'year') {
    categories = currentYearRange.value.months.map(month => month);
    seriesData = currentType.value === 'income' ? yearIncome.value : yearCost.value;
  }

  chartData.value = {
    categories,
    series: [
      {
        name: currentType.value === 'income' ? "收入" : "支出",
        data: seriesData
      }
    ]
  };
}

// 获取服务器数据
const getServerData = async () => {
  const userInfo = uni.getStorageSync('userInfo');
  if (!userInfo || !userInfo.id) {
    console.error('User ID not found in local storage');
    return;
  }
  const userId = userInfo.id;

  await loadRecords(userId);

  // 初始化周数据
  resetWeekData();

  // 初始化月数据
  resetMonthData();

  // 初始化年数据
  resetYearData();

  // 更新图表数据
  updateChartData();
};

// 重置周数据
function resetWeekData() {
  weekCost.value = {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
  };

  weekIncome.value = {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
  };

  records.value.forEach(record => {
    const recordDate = record.date.split('T')[0];
    updateWeeklyData(record, recordDate);
  });
}

// 更新周数据
function updateWeeklyData(record, recordDate) {
  if (recordDate === currentWeek.value.monday ||
      recordDate === currentWeek.value.tuesday ||
      recordDate === currentWeek.value.wednesday ||
      recordDate === currentWeek.value.thursday ||
      recordDate === currentWeek.value.friday ||
      recordDate === currentWeek.value.saturday ||
      recordDate === currentWeek.value.sunday) {
    const dayOfWeek = new Date(record.date).getDay();
    const dayKey = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][dayOfWeek];

    if (record.amount > 0) {
      weekIncome.value[dayKey] += record.amount;
    } else {
      weekCost.value[dayKey] += Math.abs(record.amount);
    }
  }
}

// 重置月数据
function resetMonthData() {
  const daysInMonth = new Date().getDate();
  monthCost.value = Array(daysInMonth).fill(0);
  monthIncome.value = Array(daysInMonth).fill(0);

  records.value.forEach(record => {
    const dayOfMonth = new Date(record.date).getDate() - 1; // array index starts from 0
    if (record.amount > 0) {
      monthIncome.value[dayOfMonth] += record.amount;
    } else {
      monthCost.value[dayOfMonth] += Math.abs(record.amount);
    }
  });
}

// 重置年数据
function resetYearData() {
  yearCost.value = Array(12).fill(0);
  yearIncome.value = Array(12).fill(0);

  records.value.forEach(record => {
    const monthOfYear = new Date(record.date).getMonth();
    if (record.amount > 0) {
      yearIncome.value[monthOfYear] += record.amount;
    } else {
      yearCost.value[monthOfYear] += Math.abs(record.amount);
    }
  });
}

// 组件挂载时获取数据
import { onMounted } from 'vue';
onMounted(() => {
  getServerData();
});
</script>

<style scoped>
.charts-box {
  width: 100%;
  height: 300px;
}
</style>
