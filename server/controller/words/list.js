// const { words } = require('../../models/users');
const dummy = require('../../models/dummy');

module.exports = {
  get: (req, res) => {
    console.log(dummy);
    res.status(200).json(dummy);
  },
};

// words.findAll({ where: { user_id: req.session.userid } }).then((list) => {
//   res.status(200).send(list);
// });
