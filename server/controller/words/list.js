const { words } = require('../../models/users');
const dummy = require('../../models/dummy');

module.exports = {
  get: (req, res) => {
    if (req.session.userId) {
      res.status(200).json(dummy);
    } else {
      res.status(401).send('need user session');
    }
  },
};

// words.findAll({ where: { user_id: req.session.userid } }).then((list) => {
//   res.status(200).send(list);
// });
