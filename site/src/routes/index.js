var express = require('express');
var router = express.Router();
const {home, search, aboutUs} = require('../controllers/indexController')
/* GET home page. */
router.get('/', home );
router.get('/search', search)
router.get('/aboutUs', aboutUs)
module.exports = router;
