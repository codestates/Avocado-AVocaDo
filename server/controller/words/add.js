const { words } = require('../../models/users');
const dummy = require('../../models/dummy');

module.exports = {
  post: (req, res) => {
    const { word } = req.body;

    if (req.session.userId) {
      dummy['data'][word] = [];
      res.status(200).json(dummy);
    } else {
      res.status(401).send('need user session');
    }
  },
};

// words.create({ word }).then(res.status(201).send('등록되었습니다'));
