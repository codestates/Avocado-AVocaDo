const { words } = require('../../models/users');

module.exports = {
  get: (req, res) => {
    if (req.session.userid) {
      words.findAll({ where: { user_id: req.session.userid } }).then((list) => {
        res.status(200).send(list);
      });
    } else {
      res.status(401).send('need user session');
    }
  },
};
