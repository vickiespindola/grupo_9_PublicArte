const products = require('../data/products.json')

const path = require('path')
const fs = require('fs')

const productsFilePath = path.join(__dirname, '../data/products.json');
/* let products=JSON.parse(fs.readFileSync(productsFilePath, "utf-8")) */

const controller = {
   //listar
    list: (req, res) => { 
        let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'));
       res.render('admin/admin', {products})
    },
    //crear
    create: (req, res) => {
        res.render('admin/create', {products});
    },
    
    store: (req, res) => {
        let product = req.body 
        product.id = products.length+1;
        product.imagen = req.file ? req.file.filename : 'defaultImage.png';
        product.precio = +req.body.precio;
        product.categoria = req.body.categoria;

        products.push(product);

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect(`/product/detail/${product.id}`);
      
    },
   //editar
    edit: (req, res) => {
        const {id} = req.params
        let producto = products.find(element => element.id === +id);
        res.render('admin/edit', {producto});
    },

    update: (req, res) => {
	    const productUpdate = products.find(product => product.id === +req.params.id)
		let {title, brand, category, description, price} = req.body
		if (productUpdate){
          productUpdate.titulo = title
		  productUpdate.marca = brand
		  productUpdate.categoria = category
		  productUpdate.descripcion = description 
          productUpdate.imagen = req.file ? req.file.filename : null
          productUpdate.precio = +price
		 
		  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
		
          res.redirect(`/product/detail/${+req.params.id}`)
		}else{
            res.redirect('/')

		}
    },
    //eliminar
    destroy : (req, res) => {
		products = products.filter(product => product.id !== +req.params.id)

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
		res.redirect('/admin')
	}
 
}
module.exports = controller;