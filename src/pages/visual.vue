<template>
  <ChartTop @choseTypes="choseType"/>
  <view class="charts-box">
    <qiun-data-charts
      type="line"
      :opts="opts"
      :chartData="chartData"
    />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadRecords, records } from '@/API/loadRecords';
import useCurrentWeekRange from '@/composables/useGetdate';
const { currentWeek } = useCurrentWeekRange();

// 定义响应式的数据对象
const chartData = ref({});
const currentType = ref('expense');

// 定义 opts 对象
const opts = ref({
  color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
  padding: [15, 10, 0, 15],
  enableScroll: false,
  legend: {},
  xAxis: {
    disableGrid: true
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

// 定义周数据对象
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

// 选择类型函数
function choseType(type) {
  currentType.value = type;
  updateChartData();
}

// 更新图表数据
function updateChartData() {
  const weekData = currentType.value === 'income' ? weekIncome.value : weekCost.value;
  const res = {
    categories: [currentWeek.value.monday,
                currentWeek.value.tuesday,
                currentWeek.value.wednesday,
                currentWeek.value.thursday,
                currentWeek.value.friday,
                currentWeek.value.saturday,
                currentWeek.value.sunday],
    series: [
      {
        name: "数据",
        data: [weekData.monday,
               weekData.tuesday,
               weekData.wednesday,
               weekData.thursday,
               weekData.friday,
               weekData.saturday,
               weekData.sunday]
      },
    ]
  };
  chartData.value = res;
}

// 获取服务器数据的函数
const getServerData = async () => {
  await loadRecords();
  await useCurrentWeekRange();

  // 重置周数据
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
    switch(recordDate.substring(5, 10)) {
      case currentWeek.value.monday:
        if (record.amount > 0) {
          weekIncome.value.monday += record.amount;
        } else {
          weekCost.value.monday += Math.abs(record.amount);
        }
        break;
      case currentWeek.value.tuesday:
        if (record.amount > 0) {
          weekIncome.value.tuesday += record.amount;
        } else {
          weekCost.value.tuesday += Math.abs(record.amount);
        }
        break;
      case currentWeek.value.wednesday:
        if (record.amount > 0) {
          weekIncome.value.wednesday += record.amount;
        } else {
          weekCost.value.wednesday += Math.abs(record.amount);
        }
        break;
      case currentWeek.value.thursday:
        if (record.amount > 0) {
          weekIncome.value.thursday += record.amount;
        } else {
          weekCost.value.thursday += Math.abs(record.amount);
        }
        break;
      case currentWeek.value.friday:
        if (record.amount > 0) {
          weekIncome.value.friday += record.amount;
        } else {
          weekCost.value.friday += Math.abs(record.amount);
        }
        break;
      case currentWeek.value.saturday:
        if (record.amount > 0) {
          weekIncome.value.saturday += record.amount;
        } else {
          weekCost.value.saturday += Math.abs(record.amount);
        }
        break;
      case currentWeek.value.sunday:
        if (record.amount > 0) {
          weekIncome.value.sunday += record.amount;
        } else {
          weekCost.value.sunday += Math.abs(record.amount);
        }
        break;
    }
  });

  // 初始化图表数据
  updateChartData();
};

// 组件挂载时调用 getServerData 函数
onMounted(() => {
  getServerData();
});
</script>

<style scoped>
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
  width: 100%;
  height: 300px;
}
</style>
