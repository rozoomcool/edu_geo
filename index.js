const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 3000 || process.env.PORT;
const urlencodedParser = express.urlencoded({extended: false});

app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");

app.use(session({
    secret: proccess.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
}));

async function start() {
    await mongoose.connect('mongodb://127.0.0.1:27017')
        .then(() => console.log('DB start successful!'))
        .catch((err) => console.error(err));

    app.listen(PORT, () => {
        console.log(`Server start on port ${PORT}.`)
    });
}

start();