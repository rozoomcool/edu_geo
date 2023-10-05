module.exports = checkUserRole = () => {
    return function(req, res, next) {
      if (req.session.username) {
        next();
      } else {
        res.status(403).send('Доступ запрещен');
      }
    }
  }