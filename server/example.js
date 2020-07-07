const db = require('./models');
// console.log(User);
console.log(db.UserWord);
db.User.belongsToMany(db.Word, { through: 'UserWord' });
db.Word.belongsToMany(db.User, { through: 'UserWord' });

db.Word.sync().then(() => {
  return db.Word.findAll();
});
db.User.sync().then(() => {
  return db.User.findAll();
});
db.Sentence.sync().then(() => {
  return db.Sentence.findAll();
});
db.UserWord.sync().then(() => {
  return db.UserWord.findAll();
});

// User.sync()
//   .then(() => {
//     return User.findAll();
//   })
//   .then((data) => {
//     console.log(data);
//   });
