//order is important here
const express = require('express');
const app = express();
const port = 80;
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
// because user logs out after server restart

//order matters here
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'pankaj',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_db',
            autoRemove: 'disabled'
        }
    )
}));

// middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// use express router (middleware) // this statement should be at the end
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`error i running the server: ${err}`);
    }
    else {
        console.log(`server is running on port: ${port}`);
    }
});
