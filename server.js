const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, trysoHard, tryBudget } = require('./db');
const { log } = require('console');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

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

// 将数据存储到数据库中
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

app.post('/api/budgets', async (req, res) => {
  const data = req.body;
  try {
    const newBudget = await tryBudget.create(data);
    res.status(200).json(newBudget); // 返回创建的预算对象
  } catch (error) {
    console.error('Failed to create record:', error.name);
    console.error('Error message:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ error: 'Failed to create record', details: error.message });
  }
});

app.put('/api/budgets/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const budget = await tryBudget.findByPk(id);
    if (budget) {
      await budget.update(req.body);
      res.status(200).json(budget); // 返回更新后的预算对象
    } else {
      res.status(404).json({ message: 'Budget not found' });
    }
  } catch (error) {
    console.error('Failed to update record:', error.name);
    console.error('Error message:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ error: 'Failed to update record', details: error.message });
  }
});



// 获取预算数据
app.get('/api/budgets', async (req, res) => {
  try {
    const theBudgets = await tryBudget.findAll();
    res.json(theBudgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    res.status(500).send('Error fetching budgets');
  }
});

// Handle requests to the root path
app.get('/', (req, res) => {
  res.send('Welcome to my API server'); // Replace with your message or HTML content
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate(); // 确认数据库连接
    await sequelize.sync(); // 同步模型
    console.log('Connection has been established successfully.');
    console.log(`Server running at http://localhost:${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
