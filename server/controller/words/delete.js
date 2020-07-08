const { Word, Sentence } = require('../../models');
const { getAllData } = require('./getAllData');

module.exports = {
  delete: (req, res) => {
    const { wordId, sentenceId } = req.body;
    req.session.userId = 1;
    if (req.session.userId) {
      if (sentenceId) {
        Promise.all(
          sentenceId.map((id) => {
            return Sentence.destroy({
              where: {
                id,
              },
            });
          })
        ).then(() => {
          getAllData(req.session.userId, res, 200);
        });
      } else {
        Word.destroy({
          where: {
            id: wordId,
          },
        }).then(() => {
          getAllData(req.session.userId, res, 200);
        });
      }
    }
  },
};
