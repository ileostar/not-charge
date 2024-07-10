import { ref } from 'vue'

const records = ref<any[]>([])
const budgets = ref<any[]>([]);

export function loadRecords() {
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'http://localhost:3000/api/data',
      method: 'GET',
      sslVerify: true,
      success: (res) => {
        if (res.statusCode === 200) {
          const data = Array.isArray(res.data) ? res.data : []
          // 解包数据中的 _value 对象
          records.value = data.map((record) => {
            return {
              name: record.name._value,
              icon: record.icon._value,
              color: record.color._value,
              amount: record.amount._value,
              note: record.note,
              date: record.date,
            }
          })
          // console.log('获取记录成功', records.value)
          resolve(records.value)
        }
        else {
          // console.error('获取记录失败', res)
          reject(res)
        }
      },
      fail: (error) => {
        // console.error('获取记录失败', error)
        reject(error)
      },
    })
  })
}


export function loadBudgets() {
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'http://localhost:3000/api/budgets',
      method: 'GET',
      sslVerify: true,
      success: (res) => {
        if (res.statusCode === 200) {
          const data = Array.isArray(res.data) ? res.data : [];
          budgets.value = data;
          resolve(budgets.value);
        } else {
          reject(res);
        }
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
}
export { records,budgets }
