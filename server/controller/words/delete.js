const { words } = require('../../models/users');

module.exports = {
  post: (req, res) => {
    const { word } = req.body;

    words
      .destroy({
        where: { word },
      })
      .then(res.status(200).send('삭제되었습니다'));
  },
};
