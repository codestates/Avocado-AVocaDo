const { words } = require('../../models/users');

module.exports = {
  post: (req, res) => {
    const { word } = req.body;

    words.create({ word }).then(res.status(201).send('등록되었습니다'));
  },
};
