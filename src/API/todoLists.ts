
export const getTodos = async (userId:number) => {
  try {
    const response = await uni.request({
      url: `http://localhost:3000/api/todos`,
      method: 'GET',
      data: { userId },
    });
    console.log("获取todo成功");

    return response.data;
  } catch (error) {
    console.error('Fetching todos failed:', error);
    throw error;
  }
};

export async function updateTodo(id: number, updates: { text?: string; completed?: boolean }) {
  try {
    const response = await uni.request({
      url: `http://localhost:3000/api/todos/${id}`,
      method: 'PUT',
      data: updates,
    });
    if (response.statusCode === 200) {
      return response.data;
    } else {
      throw new Error('Failed to update todo');
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
}


// 删除待办事项
export async function deleteTodo(id: number, userId: number) {
  try {
    await uni.request({
      url: `http://localhost:3000/api/todos/${id}`,
      method: 'DELETE',
      data: { userId },
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}

