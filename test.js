const mongoose = require('mongoose');

const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/bookblog');

BlogPost.create({
  title: 'The Guide to saving money on Energy Bills',
  body: 'If you have been here a long time, you might remember when i went on ITV Tonight to dispense a masterclass in saving money on Energy Bills.'
}, (error, blogpost) => {
  console.log(error, blogpost);
});

