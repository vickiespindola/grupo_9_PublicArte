var express = require('express');
var router = express.Router();
const {home, search, aboutUs, questions, conditions} = require('../controllers/indexController')
/* GET home page. */
router.get('/', home );
router.get('/search', search)
router.get('/aboutUs', aboutUs)
router.get('/questions', questions)
router.get('/conditions', conditions)
module.exports = router;
