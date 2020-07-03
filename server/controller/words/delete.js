const { words } = require('../../models/users');

module.exports = {
  post: (req, res) => {
    const { word } = req.body;

    // if (req.session.userId) {
    //   dummy['data'][word] = [];
    //   res.status(200).json(dummy);
    // } else {
    //   res.status(401).send('need user session');
    // }

    words
      .destroy({
        where: { word },
      })
      .then(res.status(200).send('삭제되었습니다'));
  },
};
