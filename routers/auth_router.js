require('dotenv').config();

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user')
const SALT = process.env.SALT;

router.post('/login', async (req, res) => {
  try{
    const { username, password } = req.body;

    const user = await User.find({username});
    if (!user) return res.status(403).json({message: 'Пользовательские данные введены не корректно'}); 
    
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) return res.status(403).json({message: 'Введен нверный пароль'});
    });

    req.session.username = username;
    return res.send('Пользователь успешно зарегистрирован!');
  } catch (e) {
    res.status(500).json({message: 'Ууупс, какие-то проблемы с сервером'});
    console.log('Ошибка в роутере /login'); 
  }
});

router.post('/reg', async (req, res) => {
  try{
    const { firstname, lastname, username, password, birthDay, role } = req.body;
    let userInstance = User();

    bcrypt.hash(password, SALT, (err, hash) => {
        userInstance = User({
          firstname,
          lastname,
          username,
          birthDay,
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

router.post('/logout', async (req, res) => {
  try{
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      } else {
        return res.redirect('/'); 
      }
    });
  } catch (e) {
    res.status(500).json({message: 'Ууупс, какие-то проблемы с сервером'});
    console.log('Ошибка в роутере /logout'); 
  }
});

module.exports = router;