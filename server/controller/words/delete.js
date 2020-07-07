const { Word } = require('../../models');
const dummy = require('../words/dummy');


module.exports = {
  delete: (req, res) => {
    // const { word } = req.body;

    // if (req.session) {
    //   if (word in dummy['data']) {
    //     delete dummy['data'][word];
    //   }
    //   res.status(200).json(dummy);
    // } else {
    //   res.status(401).send('need user session');
    // }
    const { wordId } = req.body;

    if (req.session) {
      // Sentence.destroy({
      //   where: {
      //     WordId: wordId,
      //   },
      // })
      // .then(()=>{
      //   Word.destroy({
      //     where: {
      //       id: wordId,
      //     },
      //   });
      // })

      Word.destroy({
        where: {
          id: wordId,
        },
      }).then(() => {
        res.status(200).end();
      });
    }

    // if (req.session.userId) {
    //   let obj = {};
    //   dummy['data'].splice(wordId, 1);
    //   res.status(200).json(dummy);
    // } else {
    //   res.status(401).send('invalid user');
    // }
  },
};

// words
//       .destroy({
//         where: { word },
//       })
//       .then(res.status(200).send('삭제되었습니다'));
