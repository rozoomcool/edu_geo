const roles = {
  admin,
  teacher,
  student
}

module.exports = checkUserRole = (role) => {
  return function(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === role) {
      next();
    } else {
      res.status(403).send('Доступ запрещен');
    }
  }
}