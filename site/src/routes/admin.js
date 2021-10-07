const express = require('express');
const router = express.Router();
const {list,create,store,edit,update,erase} = require('../controllers/adminController')

router.get('/admin', list);

router.get('/create', create);
router.post('/create', store);

router.get('/edit/:id', edit);
router.put('/edit/:id', update);

router.delete('/delete', erase);

module.exports = router; 