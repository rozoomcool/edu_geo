require('dotenv').config();

const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.put('/password', async (req, res) => {
    const { password } = req.body;
    const currentUser = req.session.user;

    bcrypt.compare(password, currentUser.password, (err, result) => {
        
    });

});

module.exports = router;