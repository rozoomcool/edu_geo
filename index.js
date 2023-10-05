require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();

const PORT = 3000 || process.env.PORT;
const urlencodedParser = express.urlencoded({extended: false});

const authRouter = require('./routers/auth_router');

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");

app.use('/auth', authRouter);

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use('/', (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

async function start() {
    await mongoose.connect('mongodb://127.0.0.1:27017/edugeo')
        .then(() => console.log('DB start successful!'))
        .catch((err) => console.error(err));

    app.listen(PORT, () => {
        console.log(`Server start on port ${PORT}.`);
    });
}

start();