const { getAllData } = require('./getAllData');

module.exports = {
  get: (req, res) => {
    req.session.userId = 1;
    if (req.session.userId) {
      getAllData(req.session.userId, res, 200);
    } else {
      res.status(401).send('need user session');
    }
  },
};
