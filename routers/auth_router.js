const router = require('express').Router();


app.post('/login', (req, res) => {
    if (isValidUser(req.body.username, req.body.password)) {
      req.session.user = req.body.username;
      res.send('Вы успешно вошли в систему');
    } else {
      res.send('Неверные учетные данные');
    }
});

app.post('/reg', (req, res) => {
    
})