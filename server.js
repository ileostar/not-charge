const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

const dataStorage = []
const budgetStorage = [];

app.post('/api/data', (req, res) => {
  const data = req.body
  dataStorage.push(data)
  res.status(200).send('Data stored')
})

app.get('/api/data', (req, res) => {
  res.json(dataStorage)
})

// 添加或更新预算数据
app.post('/api/budgets', (req, res) => {
  const { amount, date } = req.body;
  const existingIndex = budgetStorage.findIndex(budget => budget.date === date);

  if (existingIndex >= 0) {
    budgetStorage[existingIndex].amount = amount;
  } else {
    budgetStorage.push({ amount, date });
  }

  res.status(200).send('Budget stored');
});

// 获取预算数据
app.get('/api/budgets', (req, res) => {
  res.json(budgetStorage);
});

// Handle requests to the root path
app.get('/', (req, res) => {
  res.send('Welcome to my API server') // Replace with your message or HTML content
})

app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`)
})
