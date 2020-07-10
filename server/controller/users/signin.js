/* eslint-disable */
// const { users } = require('../../models');
// const crypto = require('crypto');
const request = require('request');
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

      User.findOne({
        where: {
          email: userId,
          password,
          loginType,
        },
      }).then((data) => {
        if (data) {
          accept(data.id);
        } else {
          res.status(401).send('invalid user');
        }
      });
    }

    if (loginType === 'facebook') {
      //facebook verification
      request.get(
        `https://graph.facebook.com/debug_token?input_token=${tokenId}&access_token=${access_token}`,
        (error, response, body) => {
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
                accept(data[0].id);
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
          try {
            if (error) {
              res.status(401).send('invalid user');
            } else {
              if (JSON.parse(body).error) {
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
                    accept(data[0].id);
                  });
                }
              }
            }
          } catch (err) {
            res.status(401).send('invalid user');
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
  },
};
