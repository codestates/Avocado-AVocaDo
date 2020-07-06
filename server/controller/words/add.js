const { words } = require('../../models/users');
const dummy = require('../../models/dummy');

module.exports = {
  post: (req, res) => {
    // const { word } = req.body;

    // if (req.session) {
    //   if (word in dummy['data']) {
    //     res.status(400).end('words already exists');
    //   } else {
    //     dummy['data'][word] = [];
    //     res.status(200).json(dummy);
    //   }
    // } else {
    //   res.status(401).send('need user session');
    // }
    const { word, sentences } = req.body;

    if (req.session.userId) {
      let obj = {};
      obj['word'] = word;
      obj['sentences'] = sentences;
      dummy['data'].push(obj);
      res.status(200).json(dummy);
    } else {
      res.status(401).send('invalid user');
    }
  },
};

// words.create({ word }).then(res.status(201).send('등록되었습니다'));
