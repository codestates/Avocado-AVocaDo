// const { users } = require('../../models');
const dummyUsers = require('./dummyUsers');

module.exports = {
  post: (req, res) => {
    const { userId, password } = req.body;
    if (dummyUsers[userId]) {
      res.status(409).send('Already exists user');
    } else {
      dummyUsers[userId] = password;
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
