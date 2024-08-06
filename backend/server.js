const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const { Op } = require('sequelize')
const { sequelize, trysoHard, tryBudget, User, Todo } = require('./db')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

// 中间件: 验证并处理请求数据
app.use((req, res, next) => {
  if (req.body.name && typeof req.body.name !== 'string')
    req.body.name = JSON.stringify(req.body.name)

  if (req.body.icon && typeof req.body.icon !== 'string')
    req.body.icon = JSON.stringify(req.body.icon)

  if (req.body.color && typeof req.body.color !== 'string')
    req.body.color = JSON.stringify(req.body.color)

  next()
})

// 用户登录并获取用户信息
app.post('/api/login', async (req, res) => {
  const { code, userInfo } = req.body
  const appId = 'wxd953992b45225b91' // 替换为你的微信小程序的 appId
  const appSecret = 'aec180a033c775821483040dcac7f198' // 替换为你的微信小程序的 appSecret

  if (!code || !userInfo)
    return res.status(400).json({ error: '缺少 code 或 userInfo' })

  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`

  try {
    const response = await axios.get(url)

    const { openid } = response.data

    if (!openid)
      return res.status(500).json({ error: '获取 openid 失败' })

    let user = await User.findOne({ where: { openid } })

    if (!user) {
      user = await User.create({
        openid,
        nickname: userInfo.nickName,
        avatar_url: userInfo.avatarUrl,
      })
    }
    else {
      // 如果用户已存在，更新用户信息
      await user.update({
        nickname: userInfo.nickName,
        avatar_url: userInfo.avatarUrl,
      })
    }

    res.status(200).json({ userInfo: user })
  }
  catch (error) {
    console.error('登录失败:', error)
    res.status(500).json({ error: '登录失败', details: error.message })
  }
})

// 将数据存储到数据库中
app.post('/api/data', async (req, res) => {
  const data = req.body
  const { userId } = req.body
  try {
    const user = await User.findByPk(userId)
    if (!user)
      return res.status(404).json({ error: 'User not found' })

    await trysoHard.create({ ...data, user_id: userId })
    res.status(200).send('Data stored')
  }
  catch (error) {
    console.error('Failed to create record:', error.name)
    console.error('Error message:', error.message)
    console.error('Stack trace:', error.stack)
    res.status(500).json({ error: 'Failed to create record', details: error.message })
  }
})

// 从数据库中获取数据
app.get('/api/data', async (req, res) => {
  const userId = req.query.userId
  if (!userId)
    return res.status(400).json({ error: 'userId is required' })

  try {
    const records = await trysoHard.findAll({ where: { user_id: userId } }) // 获取所有记录
    res.json(records)
  }
  catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Error fetching data', details: error.message })
  }
})

// 从数据库中获取当前月份数据
app.get('/api/databymonth', async (req, res) => {
  const userId = req.query.userId
  const monthIndex = req.query.month
  const currentYear = new Date().getFullYear()
  const nextmonthIndex = Number.parseInt(monthIndex) + 1
  // 构造月份的开始和结束日期
  const startDate = new Date(currentYear, monthIndex, 1, 0, 0, 0, 0)
  const endDate = new Date(currentYear, nextmonthIndex, 0, 23, 59, 59)
  if (!userId)
    return res.status(400).json({ error: 'userId is required' })

  try {
    const recordsBymonth = await trysoHard.findAll({
      where: {
        user_id: userId,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    })
    res.json(recordsBymonth)
  }
  catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Error fetching data', details: error.message })
  }
})

// 将预算数据存储到数据库中
app.post('/api/budgets', async (req, res) => {
  const data = req.body
  const { userId } = req.body

  try {
    const user = await User.findByPk(userId)
    if (!user)
      return res.status(404).json({ error: 'User not found' })

    const newBudget = await tryBudget.create({ ...data, user_id: userId })
    res.status(200).json(newBudget)
  }
  catch (error) {
    console.error('Failed to create record:', error.name)
    console.error('Error message:', error.message)
    console.error('Stack trace:', error.stack)
    res.status(500).json({ error: 'Failed to create record', details: error.message })
  }
})

// 更新预算数据
app.put('/api/budgets/:id', async (req, res) => {
  const id = Number.parseInt(req.params.id)
  const { userId, amount, date } = req.body

  try {
    const user = await User.findByPk(userId)
    if (!user)
      return res.status(404).json({ error: 'User not found' })

    const budget = await tryBudget.findByPk(id)
    if (budget && budget.user_id === userId) {
      await budget.update({ amount, date })
      res.status(200).json(budget)
    }
    else {
      res.status(404).json({ message: 'Budget not found or unauthorized' })
    }
  }
  catch (error) {
    console.error('Failed to update record:', error.name)
    console.error('Error message:', error.message)
    console.error('Stack trace:', error.stack)
    res.status(500).json({ error: 'Failed to update record', details: error.message })
  }
})

// 获取预算数据
app.get('/api/budgets', async (req, res) => {
  const userId = req.query.userId
  if (!userId)
    return res.status(400).json({ error: 'userId is required' })

  try {
    const theBudgets = await tryBudget.findAll({ where: { user_id: userId } })
    res.json(theBudgets)
  }
  catch (error) {
    console.error('Error fetching budgets:', error)
    res.status(500).send('Error fetching budgets')
  }
})

// 获取待办事项
app.get('/api/todos', async (req, res) => {
  const userId = req.query.userId
  if (!userId)
    return res.status(400).json({ error: 'userId is required' })

  try {
    const todos = await Todo.findAll({ where: { user_id: userId } })
    res.json(todos)
  }
  catch (error) {
    console.error('Error fetching todos:', error)
    res.status(500).send('Error fetching todos')
  }
})

// 添加待办事项
app.post('/api/todos', async (req, res) => {
  const { text, userId } = req.body
  try {
    const user = await User.findByPk(userId)
    if (!user)
      return res.status(404).json({ error: 'User not found' })

    const todo = await Todo.create({ text, user_id: userId })
    res.status(201).json(todo)
  }
  catch (error) {
    console.error('Error creating todo:', error)
    res.status(500).json({ error: 'Error creating todo' })
  }
})

// 更新待办事项
app.put('/api/todos/:id', async (req, res) => {
  const id = Number.parseInt(req.params.id)
  const { text, completed } = req.body

  try {
    const todo = await Todo.findByPk(id)
    if (!todo)
      return res.status(404).json({ error: 'Todo not found' })

    // 更新待办事项的状态和文本
    if (typeof completed === 'boolean')
      todo.completed = completed

    if (text)
      todo.text = text

    await todo.save()

    res.json(todo)
  }
  catch (error) {
    console.error('Error updating todo:', error)
    res.status(500).json({ error: 'Error updating todo' })
  }
})

app.delete('/api/todos/:id', async (req, res) => {
  const id = Number.parseInt(req.params.id)
  const { userId } = req.body
  try {
    const todo = await Todo.findByPk(id)
    if (!todo || todo.user_id !== userId)
      return res.status(404).json({ error: 'Todo not found or unauthorized' })

    await todo.destroy()
    res.status(204).send()
  }
  catch (error) {
    console.error('Error deleting todo:', error)
    res.status(500).json({ error: 'Error deleting todo' })
  }
})

// 获取用户的总记账天数和总记账笔数
app.get('/api/stats', async (req, res) => {
  const { userId } = req.query

  try {
    const bills = await trysoHard.findAll({ where: { user_id: userId } })
    const totalEntries = bills.length
    const totalDays = new Set(bills.map(bill => bill.date.toISOString().split('T')[0])).size

    res.status(200).json({
      totalEntries,
      totalDays,
    })
  }
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch user stats', details: error.message })
  }
})

app.get('/', (req, res) => {
  res.send('Welcome to my API server')
})

app.listen(port, async () => {
  try {
    await sequelize.authenticate() // 确认数据库连接
    await sequelize.sync() // 同步模型
    console.log('Connection has been established successfully.')
    console.log(`Server running at http://localhost:${port}`)
  }
  catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})
