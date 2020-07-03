const { words } = require('../../models/users');
const dummy = require('../../models/dummy');

module.exports = {
  delete: (req, res) => {
    const { word } = req.body;

    if (req.session) {
      if (word in dummy['data']) {
        delete dummy['data'][word];
      }
      res.status(200).json(dummy);
    } else {
      res.status(401).send('need user session');
    }
  },
};

// words
//       .destroy({
//         where: { word },
//       })
//       .then(res.status(200).send('삭제되었습니다'));
