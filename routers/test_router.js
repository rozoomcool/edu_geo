const router = require('express').Router();
const roleMiddleware = require('../middlewares/role_middleware');
const Test = require('../models/test');

router.use(roleMiddleware('teacher'));

router.get('/', async (req, res) => {
    res.render('test_add.hbs');
});

router.post('/', async (req, res) => {
    const { title, questions } = req.body;
    await Text.save({title, questions})
        .then(() => res.render('test_add.hbs', {message: 'Тест успешно добавлен'}))
        .catch((err) => res.status(500).json({message: "Ууппссссс... Что-то пошло не так!"}));
});

module.exports = router;