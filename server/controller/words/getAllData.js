const { Word, UserWord, UserSentence, Sentence } = require('../../models');

module.exports = {
  getAllData: (UserId, res, statusCode) => {
    let responseArr = [];
    let responseObj = {
      data: responseArr,
    };
    UserWord.findAll({
      where: {
        UserId,
      },
      include: [
        {
          model: Word,
          attributes: ['word'],
          required: true,
        },
      ],
    }).then((data) => {
      Promise.all(
        data.map((row) => {
          return UserSentence.findAll({
            where: { UserId: row.UserId },
            include: [
              {
                model: Sentence,
                where: {
                  WordId: row.WordId,
                },
                attributes: ['sentence'],
              },
            ],
          }).then((data) => {
            let singleObj = {};
            singleObj['word'] = {};
            singleObj['word'][row.WordId] = row.Word.word;
            singleObj['updatedAt'] = row.updatedAt;
            singleObj['sentences'] = {};
            data.forEach((userSentence) => {
              singleObj['sentences'][userSentence.SentenceId] =
                userSentence.Sentence.sentence;
            });
            responseArr.push(singleObj);
          });
        })
      ).then(() => {
        res.status(statusCode).json(responseObj);
      });
    });
  },
};
