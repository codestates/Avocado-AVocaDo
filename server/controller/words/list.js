const { Word, UserWord, UserSentence, Sentence } = require('../../models');
const dummy = require('../words/dummy');

module.exports = {
  get: (req, res) => {
    if (req.session.id) {
      // Word.findAll({
      //   include: [
      //     {
      //       model: UserWord,
      //       required: true,
      //       where: {
      //         UserId: req.session.id,
      //       },
      //     },
      //   ],
      // }).then((data) => {
      //   console.log(data);
      // });

      UserWord.findAll({
        where: {
          user_id: req.session.id,
        },
        include: [
          {
            model: Word,
            required: true,
          },
        ],
      }).then((data) => {
        console.log(data);
      });

      // UserWord.findAll({
      //   where: { UserId: req.session.id },
      // });
      res.status(200).json(dummy);
    } else {
      res.status(401).send('need user session');
    }
  },
};

// words.findAll({ where: { user_id: req.session.userid } }).then((list) => {
//   res.status(200).send(list);
// });

// select
//     u.id,
//     w.word
// from users u
// join WordUser wu on wu.userid = u.id
// join word w on w.id = wu.word_id
// where u.id = req.session.id
