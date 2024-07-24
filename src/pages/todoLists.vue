<script setup lang="ts">
import { ref } from 'vue'
import { deleteTodo, getTodos, updateTodo } from '@/API/todoLists'
// 定义 Todo 接口
interface Todo {
  id: number
  text: string
  completed: boolean
}

// 待办事项列表
const todos = ref<Todo[]>([])
// 新待办事项的文本
const newTodo = ref('')

// 从本地获取userId
const userInfo = uni.getStorageSync('userInfo')
const userId = userInfo.id

async function toGetTodo() {
  try {
    const loadTodos = await getTodos(userId)
    // 类型转换和检查
    if (Array.isArray(loadTodos)) {
      todos.value = loadTodos.map(item => ({
        id: item.id,
        text: item.text || '',
        completed: item.completed || false,
      }))
    }
    else {
      console.error('Invalid data format:', loadTodos)
    }
  }
  catch (error) {
    console.error('Failed to fetch todos:', error)
  }
}

// 添加新待办事项
async function addTodo() {
  if (newTodo.value.trim() !== '') {
    // todos.value.unshift({ text: newTodo.value, completed: false });

    if (!userId) {
      console.error('User ID not found in local storage')
      return
    }

    try {
      await uni.request({
        url: 'http://localhost:3000/api/todos',
        method: 'POST',
        data: { text: newTodo.value, userId },
      })
      await toGetTodo()
      newTodo.value = ''
    }
    catch (error) {
      console.error('Failed to add todo:', error)
    }

    newTodo.value = ''
  }
}

// 切换待办事项的完成状态
async function toggleComplete(index: number) {
  const todo = todos.value[index]
  try {
    // 切换完成状态
    await updateTodo(todo.id, { completed: !todo.completed })
    // 更新本地状态
    todos.value[index].completed = !todos.value[index].completed
  }
  catch (error) {
    console.error('Failed to update todo:', error)
  }
}

async function removeTodo(index: number) {
  const todo = todos.value[index]
  try {
    await deleteTodo(todo.id, userId)
    todos.value.splice(index, 1)
  }
  catch (error) {
    console.error('Failed to delete todo:', error)
  }
}

onMounted(() => {
  toGetTodo()
})
</script>

<template>
  <view class="rounded-lg bg-gray-200 p-4 shadow-black">
    <view class="mb-4 border-b-blue text-center">
      <text class="text-2xl font-bold">
        TODO
      </text>
      <text class="text-sm text-gray-600">
        今日事今日毕，勿将今事待明日！
      </text>
    </view>
    <!-- 新增待办事项输入框和提交按钮 -->
    <view class="mb-4 flex items-center gap-2">
      <input v-model="newTodo" placeholder="新增待办事项..." class="flex-1 border border-gray-300 rounded p-2 shadow-md" @keyup.enter="addTodo">
      <button class="h-9.5 rounded bg-blue-500 text-white shadow-md" @click="addTodo">
        提交
      </button>
    </view>
    <!-- 如果待办事项列表为空，显示提示信息 -->
    <view v-if="todos.length === 0" class="rounded-lg bg-white p-4 text-center text-gray-600 shadow-lg">
      <text>添加你的第一条待办事项！ 📝</text>
      <view class="mt-4 text-left">
        <text>食用方法🧾:</text>
        <ul class="mt-2 list-disc pl-4">
          <li>✏️写上你的代办事项即可提交~</li>
          <li>📌添加事项后点击✔可暂时标记已完成</li>
          <li>🗑️添加事项后点击❌即永远删除事项</li>
          <li>⏳希望这个让我们彻底告别"忘记了"</li>
          <li>💾 感谢你的使用~</li>
        </ul>
      </view>
    </view>
    <!-- 如果待办事项列表不为空，显示待办事项 -->
    <view v-else class="rounded-lg bg-white p-4 shadow-lg">
      <view v-for="(todo, index) in todos" :key="index" class="mb-2 flex items-center justify-between rounded-lg bg-white p-3 shadow-sm">
        <!-- 动态类名切换，已完成的待办事项显示删除线和灰色字体 -->
        <view class="flex-1" :class="[{ 'line-through text-gray-400': todo.completed }]">
          <text>{{ todo.text }}</text>
        </view>
        <view class="flex gap-2">
          <button class="cursor-pointer border-none bg-none text-xl" @click="toggleComplete(index)">
            ✔
          </button>
          <button class="cursor-pointer border-none bg-none text-xl" @click="removeTodo(index)">
            ❌
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
/* Add your styles here if needed */
</style>
