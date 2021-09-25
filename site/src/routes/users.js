var express = require('express');
var router = express.Router();
const {login, register} = require('../controllers/usersController')
/* GET users listing. */
router.get('/login', login);
router.get('/register', register);

module.exports = router;
