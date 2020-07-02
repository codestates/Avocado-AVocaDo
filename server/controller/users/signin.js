const { users } = require('../../models');
// const crypto = require('crypto');

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;

    /* 
    let shasum = crypto.createHash('sha2')
    .update(password+'vocap!')
    .digest('hex')
    테스트 후 적용
    */

    users.findOne({ where: { email, password } }).then((data) => {
      if (data) {
        req.session.userid = data.id;
        res.status(200).send({ id: data.id });
      } else {
        res.status(404).send('unvalid user');
      }
    });
  },
};
