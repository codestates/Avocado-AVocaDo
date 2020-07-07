const { Word, UserWord, sequelize } = require('../../models');
const dummy = require('../words/dummy');

module.exports = {
  post: async (req, res) => {
    const { word, sentences } = req.body;

    req.session.id = 1;
    if (req.session.id) {
      Word.findOrCreate({
        where: {
          word,
        },
        default: {
          word,
        },
      })
        .spread((data, create) => {
          console.log(create);
          return data[0].id;
        })
        .then((data) => {
          UserWord.findOrCreate({
            where: {
              WordId: data,
              UserId: req.session.id,
            },
          });
        })
        .then(() => {
          res.status(200).end('OK');
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
