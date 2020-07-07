const { Word, UserWord } = require('../../models');
const dummy = require('../words/dummy');

module.exports = {
  post: async (req, res) => {
    const { word } = req.body;

    req.session.userId = 1;
    if (req.session.userId) {
      Word.findOrCreate({
        where: {
          word,
        },
        default: {
          word,
        },
      })
        .then((data) => {
          return data[0].id;
        })
        .then((data) => {
          UserWord.findOrCreate({
            where: {
              WordId: data,
              UserId: req.session.userId,
            },
          });
        })
        .then(() => {
          res.status(200).json();
        });
    } else {
      res.status(401).send('invalid user');
    }

    // if (req.session.userId) {
    //   let obj = {};
    //   obj['word'] = word;
    //   obj['sentences'] = sentences;
    //   dummy['data'].push(obj);
    //   res.status(200).json(dummy);
    // } else {
    //   res.status(401).send('invalid user');
    // }
  },
};

// words.create({ word }).then(res.status(201).send('등록되었습니다'));
