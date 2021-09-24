const express = require('express');
const router = express.Router();
const {list,edit,create} = require('../controllers/adminController')

router.get('/admin', list);
router.get('/edit', edit);
router.get('/create', create);

module.exports = router;