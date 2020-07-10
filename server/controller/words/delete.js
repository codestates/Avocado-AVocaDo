const { Word, Sentence, UserWord } = require('../../models');
const { getAllData } = require('./getAllData');

module.exports = {
  delete: (req, res) => {
    const { wordId, sentenceId } = req.body;
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
        UserWord.findAll({
          where: {
            wordId: wordId,
          },
        }).then((results) => {
          if(results.length > 1) {
            UserWord.destroy({
              where: {
                userId: req.session.userId,
                wordId
              }
            })
            getAllData(req.session.userId, res, 200);
          } else {
            Word.destroy({
              where: {
                id: wordId
              }
            })
            getAllData(req.session.userId, res, 200);
          }
        });
      }
    }
  },
};
