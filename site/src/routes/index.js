var express = require('express');
var router = express.Router();
const {home} = require('../controllers/indexController')
/* GET home page. */
router.get('/', home );

module.exports = router;
