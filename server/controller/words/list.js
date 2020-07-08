const { getAllData } = require('./getAllData');

module.exports = {
  get: (req, res) => {
    if (req.session.userId) {
      getAllData(req.session.userId, res, 200);
    } else {
      res.status(401).send('need user session');
    }
  },
};
