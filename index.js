//order is important here
const express = require('express');
const app = express();
const port = 80;
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'pankaj',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// use express router (middleware) // at the end
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`error i running the server: ${err}`);
    }
    else {
        console.log(`server is running on port: ${port}`);
    }
});
