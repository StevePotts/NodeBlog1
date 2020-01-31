module.exports = (req, res, next) => {
  if (req.session.userId) {
    return res.render('create', {
      createPost: true
    });
  }
  res.redirect('/auth/login');
};
