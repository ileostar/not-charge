const { Sequelize, DataTypes } = require('sequelize');

// 创建 Sequelize 实例
const sequelize = new Sequelize('try', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
});

// 测试数据库连接
(async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()


const trysoHard = sequelize.define('trysoHard', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
});


const tryBudget=sequelize.define('tryBudget',{
  amount:{
    type:DataTypes.STRING,
    allowNull: false,
  },
  date:{
    type:DataTypes.DATE,
    allowNull: false,
  }
})

sequelize.sync()
  .then(() => {
    console.log('Models synchronized successfully.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

module.exports = {
  sequelize,
  trysoHard,
  tryBudget
};

// // 定义记账数据模型
// const Record = sequelize.define('Record', {
//   amount: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   date: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
//   },
//   note: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
// });

// // 同步模型到数据库
// async function syncModels() {
//   await Record.sync({ force: false }); // 设置 force: true 可以在每次启动时重建表（慎用）
// }

// module.exports = {
//   sequelize,
//   Record,
//   testConnection,
//   syncModels,
// };
