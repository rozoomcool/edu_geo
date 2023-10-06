require('dotenv').config();

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const SALT = parseInt(process.env.SALT);

router.get('/login', async (req, res) => {
  return res.render('login.hbs');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.send('Invalid credentials');
    }

    await bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
      }

      req.session.username = user.username;
      return res.redirect('/');

    });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
});

router.get('/reg', async (req, res) => {
  res.render('registration.hbs')
});

router.post('/reg', async (req, res) => {
  try{
    const { firstname, lastname, username, password, birthDay} = req.body;
    let hashPass = bcrypt.hashSync(password, SALT, (err, hash) => {
        if(err){
          console.log(err);
        }
    });

    await User({
      firstname: firstname,
      lastname: lastname,
      birthDay: birthDay,
      username: username,
      password: hashPass,
      role: 'student'
    }).save()
      .catch((e) => new Error());

    return res.redirect('/auth/login');

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Произошла ошибка при регистрации пользователя' });
    }
});

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