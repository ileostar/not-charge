import { ref } from 'vue'
// 假设你有一个获取当前用户 ID 的工具函数

const records = ref<any[]>([])
const budgets = ref<any[]>([])
const recordsBymonth = ref<any[]>([])

export function loadRecords(userId: string) { // 修改为接受 userId 参数
  return new Promise((resolve, reject) => {
    uni.request({
      url: `http://localhost:3000/api/data?userId=${userId}`, // 在 URL 中包含 userId
      method: 'GET',
      sslVerify: true,
      success: (res) => {
        if (res.statusCode === 200) {
          const data = Array.isArray(res.data) ? res.data : []
          records.value = data.map((record) => {
            return {
              name: record.name,
              icon: record.icon,
              color: record.color,
              amount: record.amount,
              note: record.note,
              date: record.date,
            }
          })
          console.log('获取记录成功', res)
          resolve(records.value)
        }
        else {
          console.error('获取记录失败', res)
          reject(res)
        }
      },
      fail: (error) => {
        console.error('获取记录失败', error)
        reject(error)
      },
    })
  })
}

export function loadBudgets(userId: string) { // 修改为接受 userId 参数
  return new Promise((resolve, reject) => {
    uni.request({
      url: `http://localhost:3000/api/budgets?userId=${userId}`, // 在 URL 中包含 userId
      method: 'GET',
      sslVerify: true,
      success: (res) => {
        if (res.statusCode === 200) {
          const data = Array.isArray(res.data) ? res.data : []
          budgets.value = data
          console.log('获取预算成功', budgets.value)
          resolve(budgets.value)
        }
        else {
          console.error('获取预算失败', res)
          reject(res)
        }
      },
      fail: (error) => {
        console.error('获取预算失败', error)
        reject(error)
      },
    })
  })
}

export function loadRecordsbymonth(userId: string, month: number) { // 修改为接受 userId 参数
  return new Promise((resolve, reject) => {
    uni.request({
      url: `http://localhost:3000/api/databymonth?userId=${userId}&month=${month}`, // 在 URL 中包含 userId
      method: 'GET',
      sslVerify: true,
      success: (res) => {
        if (res.statusCode === 200) {
          const data = Array.isArray(res.data) ? res.data : []
          recordsBymonth.value = data.map((record) => {
            return {
              name: record.name,
              icon: record.icon,
              color: record.color,
              amount: record.amount,
              note: record.note,
              date: record.date,
            }
          })
          console.log('获取记录成功', res)
          resolve(recordsBymonth.value)
        }
        else {
          console.error('获取记录失败', res)
          reject(res)
        }
      },
      fail: (error) => {
        console.error('获取记录失败', error)
        reject(error)
      },
    })
  })
}

export { records, budgets, recordsBymonth }
