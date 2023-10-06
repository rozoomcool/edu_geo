require('dotenv').config();

const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const authMiddleWare = require('../middlewares/auth_middleware');

router.use(authMiddleWare);

router.get('/', async (req, res) => {
    // return res.send("hello user");
    await User.findOne({username: req.session.username})
        .then((el) => res.render("profile.hbs", {user: el}))
        .catch((err) => res.status(500).json({message: "Ууупппссс... Ошибка!"}));
});

router.put('/', async (req, res) => {
    const { firstname, lastname,birthDay } = req.body;
    
    await User.updateOne({username: req.session.username}, {
        firstname,
        lastname,
        birthDay
    })
    .then(() => res.send('User updated!'))
    .catch((err) => res.status(500).json({message: 'Упппсс, Что-то пошло не так!'}));
});

module.exports = router;