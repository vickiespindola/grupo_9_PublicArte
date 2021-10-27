const express = require('express');
const router = express.Router();
const path =  require('path');
const multer = require('multer');
const {list,create,store,edit,update,destroy} = require('../controllers/adminController')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/img/products')
    },
    filename: function (req, file, callback) {
      callback(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    }
});
  
const uploadFile = multer({storage});

//SHOW ALL PRODUCTS
router.get('/', list);

// CREATE ONE PRODUCT
/* para mostrar la vista con el formulario */
router.get('/create', create)
/* crea el formulario */
router.post('/create', uploadFile.single('imagen'), store)

//EDIT ONE PRODUCT
router.get('/edit/:id', edit)
router.put('/edit/:id', update)

//DELETE ONE PRODUCT
router.delete('/delete/:id', destroy)

module.exports = router; 