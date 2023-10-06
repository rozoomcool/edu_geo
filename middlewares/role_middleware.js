const User = require('../models/user');

<<<<<<< Updated upstream
module.exports = checkUserRole = (role) => async (req, res, next) => {
  if (req.session && req.session.username) {
    await User.findOne({username: req.session.username})
      .then((el) => {
        if (el.role === role) next();
        else res.status(403).json({message: "Доступ запрещен!"});
      })
      .catch((err) => res.status(403).json({message: "Доступ запрещен!"}));
    
=======
module.exports = (role) => async (req, res, next) => {
  if (req.session && req.session.username) {
    await User.findOne({username: req.session.username})
      .then((el) => {
          if (el.role === role) next();
          else res.status(403).json({message: "У тебя нет прав"});
      })
      .catch((err) => res.status(403).json({message: "У тебя нет прав"}));
>>>>>>> Stashed changes
  } else {
    res.status(403).send('Доступ запрещен');
  }
}