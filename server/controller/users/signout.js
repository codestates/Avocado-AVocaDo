module.exports = {
  post: (req, res) => {
    req.session.userid = 1;
    console.log(req.session);

    delete req.session.userid;
    res.redirect('/');
  },
};
