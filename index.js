require('dotenv').config();

const express = require('express');
const expressHbs = require("express-handlebars");
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const hbs = require("hbs");
const app = express();

const PORT = 3000 || process.env.PORT;

const authRouter = require('./routers/auth_router');
const userRouter = require('./routers/user_router');

// устанавливаем настройки для файлов layout
app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "views/layouts",
        defaultLayout: "layout",
        extname: "hbs"
    }
))
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    name: 'cook',
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 60000 * 60000 * 5
     }
}));

app.use(express.static(__dirname + "/public"));

app.use('/auth', authRouter);

app.use('/user', userRouter);

app.get('/', async (req, res) => {
    res.render("index.hbs", {isLogin: !!req.session.username, nickname: req.session.username});
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