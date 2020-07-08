/* eslint-disable */
// const { users } = require('../../models');
// const crypto = require('crypto');
const request = require('request');
const dummyUsers = require('./dummyUsers');
const { User } = require('../../models');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });
const access_token = process.env.FACEBOOK_ACCESS_TOKEN;
const crypto = require('crypto');

module.exports = {
  post: (req, res) => {
    let { loginType, userId, password, tokenId, userName, email } = req.body;

    if (loginType === 'custom') {
      var shasum = crypto.createHmac('sha1', 'A!VoCado!');
      shasum.update(password);
      password = shasum.digest('hex');

      User.findAll({
        where: {
          email: userId,
          password,
          loginType,
        },
      }).then((data) => {
        console.log(data);
        if (data.length > 0) {
          accept(data.id);
        } else {
          res.status(401).send('invalid user');
        }
      });
    }

    // 밑에는 데이터베이스를 이용하기 전에 먼저 서버 테스트를 하기 위한 코드입니다
    // if (password !== undefined) {
    //   if (loginType === 'custom') {
    //     // if userId and logintype in database everything is ok
    //     // else userId =0, password = 0; ->밑의 54번째줄 if문에서 걸리게 하기 위해서
    //     // send 404
    //     if (dummyUsers[userId]) {
    //       if (dummyUsers[userId]['password'] === password) {
    //         accept();
    //       } else {
    //         res.status(401).send('invalid user');
    //       }
    //     } else {
    //       res.status(401).send('invalid user');
    //     }
    //   }
    // }

    if (loginType === 'facebook') {
      //facebook verification
      request.get(
        `https://graph.facebook.com/debug_token?input_token=${tokenId}&access_token=${access_token}`,
        (error, response, body) => {
          if (error) {
            res.status(401).send('invalid user');
          }
          try {
            if (!JSON.parse(body).data.is_valid) {
              res.status(401).send('invalid user');
            } else {
              User.findOrCreate({
                where: {
                  socialId: userId,
                  loginType,
                  userName,
                  email,
                },
              }).then((data) => {
                console.log(data);
                accept();
              });
            }
          } catch (err) {
            res.status(401).send('invalid user');
            // console.log(err);
          }
        }
      );
    }

    if (loginType === 'google') {
      //google verification
      //if verified- give token
      request.get(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${tokenId}`,
        (error, response, body) => {
          if (error) {
            res.status(401).send('invalid user');
          } else {
            if (JSON.parse(body).error) {
              res.status(401).send('invalid user');
            } else {
              User.findOrCreate({
                where: {
                  socialId: userId,
                  loginType,
                  userName,
                  email,
                },
              }).then((data) => {
                console.log(data);
                accept();
              });
            }
          }
        }
      );
    }

    // if (userId not in database)
    // add a new user to database

    function accept(id) {
      req.session.userId = id;
      req.session.loginType = loginType;
      res.status(200).end();
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
