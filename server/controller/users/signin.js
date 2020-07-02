// const { users } = require('../../models');
// const crypto = require('crypto');

const request = require('request');

const access_token = '1217568225253856|FoxJJZdueieUJtKvnDsVbQw6rYY';

module.exports = {
  post: (req, res) => {
    // 밑에는 데이터베이스를 이용하기 전에 먼저 서버 테스트를 하기 위한 코드입니다
    const { loginType, userId, password, tokenId } = req.body;
    if (password !== undefined) {
      if (loginType === 'custom') {
        // if userId and logintype in database everything is ok
        // else userId =0, password = 0; ->밑의 54번째줄 if문에서 걸리게 하기 위해서
        // send 404
        if (userId !== 'a' || password !== 'b') {
          res.status(401).send('unvalid user');
        }
      }
    }

    if (tokenId !== undefined) {
      if (loginType === 'facebook') {
        //facebook verification
        request.get(
          `https://graph.facebook.com/debug_token?input_token=${tokenId}&access_token=${access_token}`,
          (error, response, body) => {
            if (error) {
              res.status(401).send('unvalid user');
            }
            try {
              if (!JSON.parse(body).data.is_valid) {
                res.status(401).send('unvalid user');
              }
            } catch (err) {
              res.status(401).send('unvalid user');
              console.log(err);
            }
          }
        );
      }

      if (loginType === 'google') {
        //google verification
        //if verified- give token
        request.get(
          `https://oauth2.googleapis.com/tokeninfo?id_toen=${tokenId}`,
          (error, response, body) => {
            if (error) {
              res.status(401).send('unvalid user');
            } else {
              if (JSON.parse(body).error) {
                res.status(401).send('unvalid user');
              }
            }
          }
        );
      }
    }
    // if (userId not in database)
    // add a new user to database

    if (loginType && userId) {
      req.session.userId = userId;
      req.session.loginType = loginType;
      res.status(200).end();
    } else {
      res.status(401).send('unvalid user');
    }

    //--------------------------------
    // 여기부터는 데이터베이스를 사용한 코드입니다.

    // const { email, password } = req.body;

    // let shasum = crypto.createHash('sha2')
    // .update(password+'vocap!')
    // .digest('hex')

    // users.findOne({ where: { email, password } }).then((data) => {
    //   if (data) {
    //     req.session.userid = data.id;
    //     res.status(200).send({ id: data.id });
    //   } else {
    //     res.status(404).send('unvalid user');
    //   }
    // });
  },
};
