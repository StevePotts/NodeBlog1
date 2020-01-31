const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');

const app = new express();
const ejs = require('ejs');

// Middlewares
const validateMiddleware = require('./middleware/validationMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
// End of Middleware Section

// Controllers
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');
// End of Controller Section

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

mongoose.connect('mongodb://localhost/bookblog', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressSession({
  secret: 'asdfghtgf',
  resave: true,
  saveUninitialized: true
}));

// Get Routes
app.get('/', homeController);
app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleware, newPostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController);

// Post Routes
app.post('/posts/store', authMiddleware, storePostController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

global.loggedIn = null;
app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

app.listen(3000, () => {
  console.log('Express running on 3000');
});