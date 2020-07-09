// const { users } = require('../../models');
const { User } = require('../../models');

module.exports = {
  post: (req, res) => {
    const { userId, password } = req.body;

    User.findOrCreate({
      where: { email: userId },
      defaults: {
        password,
        loginType: 'custom',
      },
    }).then((data) => {
      if (data[1]) {
        res.status(200).end();
      } else {
        res.status(409).send('Already exists user');
      }
    });

    // if (dummyUsers[userId]) {
    //   res.status(409).send('Already exists user');
    // } else {
    //   let userObj = {};
    //   userObj['password'] = password;
    //   userObj['userName'] = userName;
    //   dummyUsers[userId] = userObj;

    //   res.status(200).end();
    // }
  },
};
