var express = require('express');
var router = express.Router();
const {list,edit,create} = require('../controllers/adminController')

router.get('/', list);
router.get('/edit', edit);
router.get('/create', create);

module.exports = router;