// const { users } = require('../../models');
const dummyUsers = require('./dummyUsers');

module.exports = {
  post: (req, res) => {
    const { userId, password, userName } = req.body;
    if (dummyUsers[userId]) {
      res.status(409).send('Already exists user');
    } else {
      let userObj = {};
      userObj['password'] = password;
      userObj['userName'] = userName;
      dummyUsers[userId] = userObj;

      res.status(200).end();
    }

    // ---------------- 데이터베이스 이후 코드 ---------------
    // const { email, username, password } = req.body;

    // users
    //   .findOrCreate({
    //     where: { email },
    //     defaults: {
    //       username,
    //       password,
    //     },
    //   })
    //   .spread((user, created) => {
    //     if (!created) {
    //       res.status(409).send('Already exists user');
    //     } else {
    //       res.status(200).send(user);
    //     }
    //   });
  },
};
