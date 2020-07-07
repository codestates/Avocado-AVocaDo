const { words } = require('../../models/users');
const dummy = require('../words/dummy');

module.exports = {
  delete: (req, res) => {
    // const { word } = req.body;

    // if (req.session) {
    //   if (word in dummy['data']) {
    //     delete dummy['data'][word];
    //   }
    //   res.status(200).json(dummy);
    // } else {
    //   res.status(401).send('need user session');
    // }
    const { wordId } = req.body;

    if (req.session.userId) {
      let obj = {};
      dummy['data'].splice(wordId, 1);
      res.status(200).json(dummy);
    } else {
      res.status(401).send('invalid user');
    }
  },
};

// words
//       .destroy({
//         where: { word },
//       })
//       .then(res.status(200).send('삭제되었습니다'));
