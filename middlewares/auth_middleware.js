module.exports = (req, res, next) => {
    console.log(req.session);
    if (req.session.username) {
        next();
    } else {
        res.redirect('auth/login');
    }
}