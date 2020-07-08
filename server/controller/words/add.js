const { Word, UserWord, Sentence, UserSentence } = require('../../models');
const dummy = require('../words/dummy');

module.exports = {
  post: async (req, res) => {
    const { word, sentences } = req.body;

    let responseArr = [];
    let responseObj = {
      data: responseArr,
    };

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
            }).then((data) => {
              UserSentence.findAll({
                where: {
                  userId: req.session.userId,
                },
                attributes: ['SentenceId'],
                includes: [
                  {
                    model: Sentence,
                    required: true,
                    attributes: ['sentence'],
                    where: {
                      WordId: data[0].WordId,
                    },
                  },
                ],
              }).then((data) => {
                console.log(data[0].toJSON());
                console.log(data[1]);
              });
            });
          })
          .then(() => {
            res.status(200).json(responseObj);
          });
      }
      // res.status(200).end();
    } else {
      res.status(401).send('invalid user');
    }

    // if (req.session.userId) {
    //   let obj = {};
    //   obj['word'] = word;
    //   obj['sentences'] = sentences;
    //   dummy['data'].push(obj);
    //   res.status(200).json(dummy);
    // } else {
    //   res.status(401).send('invalid user');
    // }
  },
};

// words.create({ word }).then(res.status(201).send('등록되었습니다'));
