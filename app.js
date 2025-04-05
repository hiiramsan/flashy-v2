// imports or libraries
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const flashcardsRoutes = require('./routes/flashcards');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/users');
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo');
  
const dbUrl = 'mongodb+srv://carlos:jvqK7bc7yTyjDqhl@cluster0.okz7s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// connection to database
mongoose.connect(dbUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

const app = express();

// settings-----------
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));



const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 3600
  }),
  name: 'flashySession',
  secret: 'thisshouldbeabettersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
    maxAge: (1000 * 60 * 60 * 24 * 7)
  }
};

app.use(session(sessionConfig));

//auth settings
app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.info = req.flash('info');
  next();
});

app.set('trust proxy', 1); // trust first proxy

app.get('/', (req, res) => {
  res.render('home')
});

app.use("/flashcards", flashcardsRoutes);
app.use("/", usersRoutes);
app.use("/", cardsRoutes)

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
})

// middleware
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!"
  res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});