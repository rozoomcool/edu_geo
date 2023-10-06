require('dotenv').config();

const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const authMiddleWare = require('../middlewares/auth_middleware');

router.use(authMiddleWare);

const roles = {
    'admin': 'Администратор',
    'teacher': 'Преподаватель',
    'student': 'Ученик'
}

const pages = {
    'teacher': 'teacher_profile.hbs',
    'student': 'student_profile.hbs'
}

router.get('/', async (req, res) => {
    await User.findOne({username: req.session.username})
        .then((el) => {
            el.birthDay = `${el.birthDay.getDay()}.${el.birthDay.getMonth()}.${el.birthDay.getFullYear()}`;
            if (el.role === 'student') {
                return res.render('student_profile.hbs', { user: el });
            }
            if (el.role === 'teacher') {
                return res.render('teacher_profile.hbs', { user: el });
            }
            if (el.role === 'admin') {
                return res.render('student_profile.hbs', { user: el });
            }
            
        })
        .catch((err) => console.log(err));
});

router.put('/', async (req, res) => {
    const { firstname, lastname, birthDay } = req.body;
    
    await User.updateOne({username: req.session.username}, {
        firstname,
        lastname,
        birthDay
    })
    .then(() => res.send('User updated!'))
    .catch((err) => res.status(500).json({message: 'Упппсс, Что-то пошло не так!'}));
});

module.exports = router;