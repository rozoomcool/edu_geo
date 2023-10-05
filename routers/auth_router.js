require('dotenv').config();

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user')
const SALT = process.env.SALT;

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    

    if (true) {
      req.session.user = req.body.username;
      res.send('Вы успешно вошли в систему');
    } else {
      res.send('Неверные учетные данные');
    }
});

router.post('/reg', async (req, res) => {
  try{
    const { firstname, lastname, username, password, role } = req.body;
    let userInstance = User();

    bcrypt.hash(password, SALT, (err, hash) => {
        userInstance = User({
          firstname,
          lastname,
          username,
          password: hash,
          role: role === null || role === undefined ? 'student' : role
        })
    }).catch((err) => console.log('Error in bcrypt hashing password in /reg'));

    await userInstance.insertOne()
      .catch((err) => console.error('Error in saving user in /reg!'));
  
      res.status(200).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Произошла ошибка при регистрации пользователя' });
    }
})