const dummy = require('../words/dummy');

module.exports = {
  put: (req, res) => {
    const { word, originalSentence, editSentence } = req.body;
    if (req.session) {
      let index = dummy['data'][word].indexOf(originalSentence);
      let editIndex = dummy['data'][word].indexOf(editSentence);
      if (index === -1) {
        res.status(400).send(`no ${originalSentence}`);
      } else {
        dummy['data'][word].splice(index, 1);
        if (editIndex === -1) {
          dummy['data'][word].push(editSentence);
          res.status(200).json(dummy);
        } else {
          res.status(400).send(`already exists ${editSentence}`);
        }
      }
    } else {
      res.status(401).send('invalid user');
    }
  },
};
