const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { sequelize, trysoHard } = require('./db');
const { log } = require('console');

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())


// 中间件: 验证并处理请求数据
app.use((req, res, next) => {
  if (req.body.name && typeof req.body.name !== 'string') {
    req.body.name = JSON.stringify(req.body.name);
  }
  if (req.body.icon && typeof req.body.icon !== 'string') {
    req.body.icon = JSON.stringify(req.body.icon);
  }
  if (req.body.color && typeof req.body.color !== 'string') {
    req.body.color = JSON.stringify(req.body.color);
  }
  next();
});


//const dataStorage = []
const budgetStorage = [];

// 将数据存储到数据库中
// app.post('/api/data', async (req, res) => {
//   try {
//     const data = req.body;
//     await trysoHard.create(data); // 使用 Record 模型创建新记录
//     res.status(200).send('Data stored');
//   } catch (error) {
//     console.error('Error storing data:', error);
//     res.status(500).send('Error storing data');
//   }
// });


app.post('/api/data', async (req, res) => {
  const data = req.body;
  console.log('Received data:', data); // 打印接收到的数据

  try {
    await trysoHard.create(data); // 使用模型创建新记录
    res.status(200).send('Data stored');
  } catch (error) {
    console.error('Failed to create record:', error.name); // 打印错误类型
    console.error('Error message:', error.message); // 打印错误信息
    console.error('Stack trace:', error.stack); // 打印错误堆栈
    res.status(500).json({ error: 'Failed to create record', details: error.message });
  }
});


// 从数据库中获取数据
app.get('/api/data', async (req, res) => {
  try {
    const records = await trysoHard.findAll(); // 获取所有记录
    res.json(records);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

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

app.listen(port, async () => {
  try {
    await sequelize.authenticate(); // 确认数据库连接
    await sequelize.sync(); // 同步模型
    console.log('Connection has been established successfully.');
    console.log(`Server running at http://localhost:${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})
