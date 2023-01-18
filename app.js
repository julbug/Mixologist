const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const PORT = 3000;
const path = require('path');
const cookieParser = require("cookie-parser");
var flash = require('connect-flash');
require('dotenv').config();

// =========== connection to DB =============


mongoose
  .connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

// ==========================================

// middleware always comes between declarations and routes
// ========== MIDDLEWARE =============
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

app.set("views", __dirname + "/views");

app.set("view engine", "hbs");

// ===================================


//========= APP SETUP ================
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 6000000
      }, // ADDED code below !!!
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
      })
    })
  );

app.use(cookieParser());
app.use(flash());


app.use(function (req, res, next) {
  res.locals.theUser = req.session.currentlyLoggedIn;
  res.locals.errorMessage = req.flash("error");
  res.locals.successMessage = req.flash("success");
  next();
})

app.use(express.static(path.join(__dirname, "..", "public")));

// ===================================

// ============== ROUTES =====================

// this is what determines the prefix to your routes within the file that you are requiring. If you add "/blah" then all the routes in your index file would have to start with /blah before any route defined. ie: you create a route in index.js that has an endpoint of '/home' but you prefixed '/blah' in the app.js to require index.js, your end result of the route would then be www.domainName.com/blah/home
//       |
app.use('/', require('./routes/index'));

app.use('/', require('./routes/authroutes.js'));

app.use('/', require('./routes/drinkroutes.js'));

app.use('/', require('./routes/ingredientsroutes.js'));

app.use('/', require('./routes/liquorroutes.js'));

// ===========================================

app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).render("error-page");
  });

app.use((err, req, res, next) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.error("ERROR", req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res.status(500).render("error-page", {theError: err});
    }
  });

app.listen(PORT || 3000, () => console.log(`Listening on port ${PORT}`));

