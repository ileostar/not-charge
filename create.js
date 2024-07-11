const {trysoHard} = require('./db');

//create方法：将 build 与 save 合二为一
// (async () => {
//     await trysoHard.create({
//       name: 'Rick',
//       icon: 'smile',
//       color: 'blue',
//       amount: 6.66,
//       note:'你好这是note',
//       date:'2020-02-02'
//     }).then(() => {
//         console.log("操作成功");
//     }).catch(error => {
//         console.log("操作失败！\n" + error);
//     })
// })();

// async function saveMany(books) {
//   try {
//       await Book.bulkCreate(books);
//       console.log("操作成功！");
//   } catch(error) {
//       console.log("操作失败！\n"+ error);
//   }
// }

// var books = [
//   {name: 'book6',price:'666'},
//   {name: 'book7',price:'666'},
//   {name: 'book8',price:'666'},
//   {name: 'book9',price:'666'},
//   {name: 'book10',author:'fjj'},
// ]
// saveMany(books);

async function findAllBooks() {
  try {
      const trysoHards = await trysoHard.findAll();
      console.log("All Books:", JSON.stringify(trysoHards, null, 2));
  } catch(error) {
      console.log("操作失败！\n" + error);
  }
}

findAllBooks();
//

// [
//   {
//     "id": 1,
//     "name": "Rick",
//     "icon": "smile",
//     "color": "blue",
//     "amount": 6.66,
//     "note": "你好这是note",
//     "date": "2020-02-02T00:00:00.000Z",
//     "createdAt": "2024-07-11T09:44:32.000Z",
//     "updatedAt": "2024-07-11T09:44:32.000Z"
//   }
// ]



// async function deleteById(id) {
//   await Book.destroy({
//       where: {
//           id: id
//       }
//   })
// }
// deleteById(5);
