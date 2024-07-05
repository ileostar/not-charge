import { ref } from 'vue'

const records = ref<any[]>([])

export function loadRecords() {
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'http://localhost:3000/api/data',
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          // 确保返回的数据是一个数组
          const data = Array.isArray(res.data) ? res.data : []
          records.value = data
          console.log('获取记录成功', records.value)
          resolve(data)
        } else {
          console.error('获取记录失败', res)
          reject(res)
        }
      },
      fail: (error) => {
        console.error('获取记录失败', error)
        reject(error)
      }
    })
  })
}

export { records }
