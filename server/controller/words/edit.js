const { words } = require('../../models/');

module.exports = {
  post: (req, res) => {
    const { word } = req.body;

    words
      .update(
        { word },
        {
          where: { word },
        }
      )
      .then(res.status(200).send('수정되었습니다'));
  },
};
