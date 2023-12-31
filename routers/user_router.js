require('dotenv').config();

const router = require('express').Router();
const User = require('../models/user');
const Test = require('../models/test');
const bcrypt = require('bcryptjs');
const authMiddleWare = require('../middlewares/auth_middleware');
const roleMiddleware = require('../middlewares/role_middleware');

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

router.get('/all', async (req, res) => {
    await User.find().then((u) => res.send(u)).catch((err) => res.status(403).json({message: "Иди отсюда"}));
});

router.put('/add_student', roleMiddleware('teacher'), async (req, res) => {
    let user = await User.findOne({username: req.session.username});
    const {userId} = req.body;
console.log(userId);
    await User.updateOne({username: req.session.username}, {children: user.children + userId})
        .then(() => res.render('teacher_profile.hbs', {message: "Пользователь успешно добавлен"}))
        .catch((err) => res.status(500).json({message: 'Упппсс, Что-то пошло не так!'}));
});

router.get('/', async (req, res) => {
    await User.findOne({username: req.session.username})
        .then(async (el) => {
            let birthDay = `${String(el.birthDay.getDay()).length == 1 ? '0' : ''}${el.birthDay.getDay()}.${String(el.birthDay.getMonth()).length == 1 ? '0' : ''}${el.birthDay.getMonth()}.${el.birthDay.getFullYear()}`;
            if (el.role === 'student') {
                let tests = await Test.find({});

                return res.render('student_profile.hbs', { isLogin: true, tests: tests, firstname: el.firstname, lastname: el.lastname, birthDay: birthDay });
            }
            if (el.role === 'teacher') {
                return res.render('teacher_profile.hbs', { isLogin: true, firstname: el.firstname, lastname: el.lastname, birthDay: birthDay, children: el.children });
            }
            if (el.role === 'admin') {
                return res.render('student_profile.hbs', { isLogin: true, firstname: el.firstname, lastname: el.lastname, birthDay: birthDay });
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