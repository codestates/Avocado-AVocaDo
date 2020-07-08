const dummy = require('../../models/dummy');

module.exports = {
  delete: (req, res) => {
    if (req.session) {
      const { word, sentence } = req.body;
      let index = dummy['data'][word].indexOf(sentence);
      dummy['data'][word].splice(index, 1);

      res.status(200).json(dummy);
    } else {
      res.status(401).send('invalid user');
    }
  },
};
