<script setup lang="ts">
// 九宫格图案
const expenseItems = reactive([
  { name: '房租', icon: 'i-carbon:home', color: 'text-blue' },
  { name: '学习', icon: 'i-carbon:book', color: 'text-purple' },
  { name: '购物', icon: 'i-carbon:shopping-cart-arrow-up', color: 'text-red' },
  { name: '美食', icon: 'i-carbon:restaurant', color: 'text-orange' },
  { name: '健身运动', icon: 'i-carbon:cyclist', color: 'text-green' },
  { name: '交通', icon: 'i-carbon:taxi', color: 'text-pink' },
  { name: '通讯', icon: 'i-carbon:phone', color: 'text-fuchsia' },
  { name: '医疗', icon: 'i-carbon:hospital', color: 'text-cyan' },
  { name: '其他', icon: 'i-carbon:tag-export', color: 'text-rose' },
])

const incomeItems = reactive([
  { name: '理财', icon: 'i-carbon:analytics', color: 'text-blue' },
  { name: '工资', icon: 'i-carbon:account', color: 'text-purple' },
  { name: '兼职', icon: 'i-carbon:sales-ops', color: 'text-red' },
  { name: '零花钱', icon: 'i-carbon:piggy-bank', color: 'text-cyan' },
  { name: '其他', icon: 'i-carbon:currency-dollar', color: 'text-orange' },

])
//传值到首页
const name=ref('')
const icon=ref('')
const color=ref('')
const note=ref('')
const amount=ref('')
let records: any[] = reactive([]);

// 选中有背景色
const selectedItem = reactive({ name: '', icon: '', color: '' })
const result = ref()
/** 默认是支出状态 */
const currentType = ref('expense')
function currentItem(item: { name: string, icon: string, color: string }) {
  selectedItem.name = item.name
  selectedItem.icon = item.icon
  selectedItem.color = item.color
  name.value=item.name
  icon.value=item.icon
  color.value=item.color

}
function getResult(value: any) {
  result.value = value
  amount.value=value
}
const currentItems = computed(() => currentType.value === 'expense' ? expenseItems : incomeItems)


// 添加记录
function addRecord() {
  const newRecord = {
    name,
    icon,
    color,
    amount: amount.value,
    note: note.value,
    date: new Date().toLocaleDateString() // 添加日期字段，可以根据实际需求格式化
  };
  uni.request({
    url: 'http://localhost:3000/api/data',
    method: 'POST',
    data: newRecord,
    success: (res) => {
      console.log('添加记录成功', res.data);
      loadRecords(); // 添加成功后重新加载记录
    },
    fail: (err) => {
      console.error('添加记录失败', err);
    }
  });
}

function loadRecords(){
  uni.request({
    url: 'http://localhost:3000/api/data',
    method: 'GET',
    sslVerify: true,
    success: (res) => {
      console.log('获取记录成功', res.data);
      records = res.data as any[]; // 显式类型断言
    },
    fail: (error) => {console.log(error.errMsg);
    }
  })
}

//点击保存收起键盘
const visitkb=ref(true)

</script>

<template>
  <view h-full min-h-screen flex flex-col bg-gray-100>
    <!-- 顶部导航栏 -->
    <view v-if="selectedItem.name" flex items-center justify-between py-2 shadow-sm bg="black/20">
      <view flex flex-col justify-between pl-3>
        <span :class="[selectedItem.icon, selectedItem.color]" text-size-xl />
        <input type="text" placeholder="备注" :maxlength="15" w-55 text-left v-model="note">
      </view>
      <view text-xl>
        {{ result ? result : "请输入金额" }}
      </view>
    </view>
    <view v-else flex items-center justify-between py-2 shadow-sm bg="black/20">
      <view flex flex-col justify-between pl-3>
        <span text-xl>记一笔</span>
      </view>
    </view>
    <!-- 选择区域 -->
    <view mt- mx-3 flex-col items-center justify-start>
      <view my-5 flex justify-between gap-14 rounded-full p-4>
        <button h-7 w-25 flex items-center justify-center rounded-full py-1 color="white" :class="currentType === 'expense' ? 'bg-[#f8c43d]' : 'bg-gray-400 '" @click="currentType = 'expense'">
          支出
        </button>
        <button
          h-7 w-25 flex items-center justify-center rounded-full py-1 text-white
          :class="currentType === 'income' ? 'bg-[#f8c43d]' : 'bg-gray-400'" @click="currentType = 'income'"
        >
          收入
        </button>
      </view>
      <GridComponent :items="currentItems" :selected-item="selectedItem" :current-item="currentItem" />
    </view>
    <!-- 键盘 -->
    <keyboard v-if="selectedItem.name" @result="getResult" @save="addRecord"/>
  </view>
</template>

<style scoped>
.iconSelect .Keyboard{
  align-content:space-evenly;
}
.icon-Items{
  width: 33%;
  height: 33%;
}
</style>
