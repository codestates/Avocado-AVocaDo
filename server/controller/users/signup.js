const { users } = require('../../models');

module.exports = {
  post: (req, res) => {
    const { email, username, password } = req.body;

    users
      .findOrCreate({
        where: { email },
        defaults: {
          username,
          password,
        },
      })
      .spread((user, created) => {
        if (!created) {
          res.status(409).send('Already exists user');
        } else {
          res.status(200).send(user);
        }
      });
  },
};
