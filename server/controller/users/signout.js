module.exports = {
  post: (req, res) => {
    req.session.destroy();
    res.status(200).end();
  },
};
