const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id).populate('userid');
  console.log(blogPost);
  res.render('post', {
    blogPost: blogPost
  });
};