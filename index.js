const express = require('express');
const app = express();
const port = 80;
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());
// use express router (middleware)
app.use('/', require('./routes/index'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function (err) {
    if (err) {
        console.log(`error i running the server: ${err}`);
    }
    else {
        console.log(`server is running on port: ${port}`);
    }
});
