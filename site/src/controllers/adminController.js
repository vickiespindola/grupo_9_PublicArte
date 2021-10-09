const products = require('../data/products.json')

const path = require('path')
const fs = require('fs')

const controller = {
    list: function (req, res, next) {

        let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'));

        res.render('admin/admin', {products});
    },
    create: function (req, res, next) {
        res.render('admin/create');
    },
    
    store: (req, res) => {
        /* const product = req.body 
        product.id = products.length + 1;
        
        products.push(product);

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect(`/products/detail/${product.id}`);
       */
        const product = req.body;
		product.id = products.length + 1;
		product.imagen = req.file ? req.file.filename : 'defaultImage.png';
        product.precio = +req.body.precio;
        product.categoria = req.body.categoria;
        product.titulo = req.body.titulo;
        product.descripcion = req.body.descripcion;
        product.marca = req.body.marca;
        product.autor = "undefined";
        product.carrito = "notAdded";
        product.keyword = "undefined";
        
    ;
        product
       
        products.push(product);

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
     /*    res.redirect(`/products/detail/${product.id}`) */
     res.render('admin/admin')

   },
    edit: function (req, res) {
        const {id} = req.params
        let producto = products.find(element => element.id === +req.params.id);
        res.render('admin/edit', {producto});
    },

    update: (req, res) => {
	    const productUpdate = products.find(product => product.id === +req.params.id)
		let {title, price, brand, category, description} = req.body
		if (productUpdate){
          productUpdate.titulo = title
		  productUpdate.precio = +price
		  productUpdate.marca = brand
		  productUpdate.categoria = category
		  productUpdate.descripcion = description

		  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
		
          res.redirect(`/products/detail/${req.params.id}`)
		}else{
            res.redirect('/')

		}
    },
    destroy : (req, res) => {
		products = products.filter(product => product.id !== +req.params.id)

		fs.writeFileSync(productsFilePath, JSON.stringify(products))
		res.redirect('/')
	}
 
}
module.exports = controller;