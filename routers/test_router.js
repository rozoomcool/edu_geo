const router = require('express').Router();
const roleMiddleware = require('../middlewares/role_middleware');
const Test = require('../models/test');

router.use(roleMiddleware('teacher'));

router.get('/', async (req, res) => {
    res.render('test_add.hbs');
});

router.post('/', async (req, res) => {
    const { title, questions } = req.body;
    await Test.save({title, questions})
        .then(() => res.render('test_add.hbs', {message: 'Тест успешно добавлен'}))
        .catch((err) => res.status(500).json({message: "Ууппссссс... Что-то пошло не так!"}));
});

router.put('/', async (req, res) => {
    const {id, title, questions} = req.body;
    await Test.updateOne({id: id}, {title, questions})
        .then(() => res.render('test_add.hbs', {message: 'Тест успешно добавлен!'}))
        .catch((err) => res.render('test_add.hbs', {error_message: 'Ошибка при добавлении теста!'}));
});

router.delete('/', async (req, res) => {
    const {id} = req.body;
    await Test.deleteOne({id:id})
        .then(() => res.render('test_add.hbs', {message: 'Удаление прошло успешно'}))
        .catch((err) => res.render('test_add.hbs', {error_message: 'Ошибка при добавлении теста!'}));
});

module.exports = router;