import { ref } from 'vue'
import { loadBudgets } from '@/API/loadRecords'

interface Budget {
  id?: number
  amount: number
  date: string
}

const budgets = ref<Budget[]>([])

interface UniRequestResponse {
  statusCode: number
  data: any
}

export async function fetchAllBudgets(): Promise<Budget[]> {
  // 从本地存储中获取 userId
  const userInfo = uni.getStorageSync('userInfo')
  if (!userInfo || !userInfo.id) {
    console.error('User ID not found in local storage')
    return []
  }

  const userId = userInfo.id

  try {
    const data = await loadBudgets(userId)
    budgets.value = data as Budget[]
    return budgets.value
  }
  catch (error) {
    console.error('Failed to fetch budgets:', error)
    return []
  }
}

export async function saveBudget(newBudget: Budget): Promise<{ success: boolean, conflict?: boolean, existingBudget?: Budget }> {
  try {
    const response = await new Promise<UniRequestResponse>((resolve, reject) => {
      uni.request({
        url: 'http://localhost:3000/api/budgets',
        method: 'POST',
        data: newBudget,
        success: res => resolve(res),
        fail: err => reject(err),
      })
    })

    if (response.statusCode === 200) {
      budgets.value.unshift(newBudget) // 新增条目
      return { success: true }
    }
    else if (response.statusCode === 409) {
      return { success: false, conflict: true, existingBudget: response.data.existingBudget }
    }
    else {
      console.error('保存预算失败', response)
      return { success: false }
    }
  }
  catch (error) {
    console.error('保存预算失败', error)
    return { success: false }
  }
}

export async function updateBudget(id: number, data: Partial<Budget>): Promise<{ success: boolean }> {
  try {
    const response = await new Promise<UniRequestResponse>((resolve, reject) => {
      uni.request({
        url: `http://localhost:3000/api/budgets/${id}`,
        method: 'PUT',
        data,
        success: res => resolve(res),
        fail: err => reject(err),
      })
    })

    if (response.statusCode === 200) {
      const index = budgets.value.findIndex(budget => budget.id === id)
      if (index >= 0)
        budgets.value[index] = { ...budgets.value[index], ...data }

      return { success: true }
    }
    else {
      console.error('更新预算失败', response)
      return { success: false }
    }
  }
  catch (error) {
    console.error('更新预算失败', error)
    return { success: false }
  }
}
