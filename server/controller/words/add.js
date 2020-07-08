const { Word, UserWord, Sentence, UserSentence } = require('../../models');

const { getAllData } = require('./getAllData');

module.exports = {
  post: async (req, res) => {
    const { word, sentences } = req.body;

    req.session.userId = 1;
    if (req.session.userId) {
      if (Array.isArray(sentences)) {
        sentences.forEach((sentence) => {
          Sentence.findOrCreate({
            where: {
              sentence,
            },
            defaults: {
              WordId: Number(Object.keys(word)[0]),
            },
          }).then((data) => {
            UserSentence.create({
              SentenceId: data[0].id,
              UserId: req.session.userId,
            });
          });
        });
      } else if (sentences) {
        Word.update(
          { word: Object.values(word)[0] },
          {
            where: {
              id: Object.keys(word)[0],
            },
          }
        );
        Object.keys(sentences).forEach((key) => {
          let value = sentences[key];
          Sentence.update(
            {
              sentence: value,
            },
            {
              where: {
                id: key,
              },
            }
          );
        });
      } else {
        Word.findOrCreate({
          where: {
            word,
          },
        })
          .then((data) => {
            return data[0];
          })
          .then((data) => {
            UserWord.findOrCreate({
              where: {
                WordId: data.id,
                UserId: req.session.userId,
              },
            });
            // .then((data) => {
            //   UserSentence.findAll({
            //     where: {
            //       userId: req.session.userId,
            //     },
            //     attributes: ['SentenceId'],
            //     include: [
            //       {
            //         model: Sentence,
            //         required: true,
            //         attributes: ['sentence'],
            //         where: {
            //           WordId: data[0].WordId,
            //         },
            //       },
            //     ],
            //   }).then((data) => {
            //     data.forEach((row)=>{

            //     })
            //   });
            // });
          });
      }
      getAllData(req.session.userId, res, 201);
    } else {
      res.status(401).send('invalid user');
    }
  },
};
