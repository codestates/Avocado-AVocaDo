const dummy = require('../../models/dummy');

module.exports = {
  post: (req, res) => {
    const { word, sentence } = req.body;

    if (req.session) {
      if (dummy['data'][word].includes(sentence)) {
      } else {
        dummy['data'][word].push(sentence);
      }
      res.status(200).json(dummy);
    } else {
      res.status(401).send('invalid user');
    }
  },
};
