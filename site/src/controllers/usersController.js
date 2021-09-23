const controller = {
   login: function (req, res, next) {
      res.render('user/login');
   },
   register: function (req, res, next) {
      res.render('user/register');
   }
}

module.exports = controller;