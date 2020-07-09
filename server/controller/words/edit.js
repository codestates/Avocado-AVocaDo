// const { words } = require('../../models/users');
const dummy = require('../../models/dummy');
// const e = require('express');

module.exports = {
  put: (req, res) => {
    // const { originalWord, editWord } = req.body;

    // if (req.session) {
    //   if (originalWord in dummy['data']) {
    //     if (editWord in dummy['data']) {
    //       res.status(400).send(`already exists ${editWord}`);
    //     } else {
    //       dummy['data'][editWord] = dummy['data'][originalWord];
    //       delete dummy['data'][originalWord];
    //       res.status(200).json(dummy);
    //     }
    //   } else {
    //     res.status(400).send(`no exists ${apple}`);
    //   }
    // } else {
    //   res.status(401).send('unvalid user');
    // }
    const { word, sentences, wordId } = req.body;

    if (req.session.userId) {
      let obj = {};
      obj['word'] = word;
      obj['sentences'] = sentences;
      dummy['data'][wordId] = obj;
      res.status(200).json(dummy);
    } else {
      res.status(401).send('invalid user');
    }
  },
};

// words
//   .update(
//     { word },
//     {
//       where: { word },
//     }
//   )
//   .then(res.status(200).send('수정되었습니다'));
