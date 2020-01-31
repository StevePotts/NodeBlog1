module.exports = (req, res, next) => {
  if (req.files == null || req.body.title == null || req.body.body) {
    return res.redirect('/posts/new');
  };
  next();
};