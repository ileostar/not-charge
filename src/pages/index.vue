<script setup lang="ts">
import { loadRecords,records } from '@/API/loadRecords'
/** 月份 */
const months = reactive(['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'])
const selectMonths = ref('六月')
/** 预算的起始与结束 */
const budgetStart = ref(2000)
const budgetEnd = ref(5000)
const haveCost = ref(2900)
// 流水账的内容
interface DetailItem {
  id: string
  name: string
  remark: string
  amount: number
  icon: string
}
const detailItems = reactive<DetailItem[]>([])
//加载的时候获得数据
onMounted(async () => {
  try {
    await loadRecords()
    console.log('记录数据:', JSON.parse(JSON.stringify(records.value)))
    console.log('记录数据2:',records.value)

  } catch (error) {
    console.error('加载记录失败', error)
  }
})


//const detailItems = reactive([
  // { id: 1, name: '房租', remark: '六月份房租', amount: -1200.00, icon: 'i-carbon:home' },
  // { id: 2, name: '学习教育', remark: '网上买了2本书', amount: -500.00, icon: 'i-carbon:book' },
  // { id: 3, name: '购物', remark: '买了一块表', amount: -800.00, icon: 'i-carbon:shopping-cart-arrow-up' },
  // { id: 4, name: '餐饮', remark: '吃了一碗面', amount: -15.00, icon: 'i-carbon:restaurant' },
  // { id: 5, name: '其他', remark: '转账', amount: +15.00, icon: 'i-carbon:tag-export' },
//])
// 主题颜色映射
const themeColors: Record<string, string> = {
  房租: 'bg-blue-500',
  学习教育: 'bg-purple-500',
  购物: 'bg-red-500',
  餐饮: 'bg-green-500',
  其他: 'bg-yellow-500',
}
function changeMonths(event: any) {
  selectMonths.value = months[event.detail.value]
}
// 计算本月预算已用多少（进度条）
const percent = computed(() => ((haveCost.value - budgetStart.value) / (budgetEnd.value - budgetStart.value)) * 100)

// 计算今日开销
const oneDaySum = computed(() => detailItems.reduce((sum, item) => sum + item.amount, 0).toFixed(2))

// Card info
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
])
</script>

<template>
  <view h-full w-full container>
    <header flex items-center justify-between py-4 dark:bg-black>
      <picker
        mode="selector"
        :range="months"
        @change="changeMonths"
      >
        <view class="flex items-center">
          <text text-lg text-black font-bold>
            {{ selectMonths }}
          </text>
          <view h-8 w-8 flex items-center justify-center rounded-full>
            <span i-icon-park:down-one />
          </view>
        </view>
      </picker>
      <view flex items-center>
        <view h-8 flex items-center justify-between rounded-full>
          <navigator
            url="/pages/myQRCode"
            open-type="navigate"
            hover-class="navigator-hover"
            i-icon-park:two-dimensional-code-two
            mr-4
          />
          <navigator
            url="/pages/scanQRCode"
            open-type="navigate"
            hover-class="navigator-hover"
            i-icon-park:scanning-two
          />
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
        <view font-600>
          ${{ budgetStart }}
        </view>
        <view font-600>
          ${{ budgetEnd }}
        </view>
      </view>
      <view mb-3 px-2 py-1>
        <progress :percent="percent" activeColor="#f8c43d" border-radius="25" />
      </view>
    </view>
    <view mb-2 rounded-lg bg="gray/30">
      <view flex items-center justify-between py-4>
        <view class="date">
          6月11日（周二）
        </view>
        <view class="sum" text-size-4>
          {{ oneDaySum }}
        </view>
      </view>
      <view v-for="item in detailItems" :key="item.id" flex items-center justify-between border-t-0.6 border-t-coolgray border-t-solid>
        <view flex items-center justify-between py-2>
          <view h-10 w-10 rounded-full :class="themeColors[item.name]">
            <span :class="item.icon" h-10 text-size-2xl text-light />
          </view>
          <view class="topic flex flex-col justify-center pl-2.5">
            <text mb-1 flex font-600>
              {{ item.name }}
            </text>
            <text text-size-xs text-bluegray font-300>
              {{ item.remark }}
            </text>
          </view>
        </view>
        <view text-size-4>
          {{ item.amount > 0 ? `+${item.amount.toFixed(2)}` : item.amount.toFixed(2) }}
        </view>
      </view>
    </view>
    <view h-2 />
  </view>
</template>

<route type="home" lang="json">
  {}
</route>
