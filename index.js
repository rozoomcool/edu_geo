require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3000 || process.env.PORT;

const authRouter = require('./routers/auth_router');
const userRouter = require('./routers/user_router');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");

app.use('/auth', authRouter);

app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.render("index.hbs");
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