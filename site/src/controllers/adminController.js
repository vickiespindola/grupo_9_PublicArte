const path = require('path')
const fs = require('fs')

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"))

const controller = {
    //listar
    list: (req, res, next) => {
        let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'));
        res.render('admin/admin', {
            products: JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'))
        });
    },
    //crear
    create: (req, res, next) => {
        res.render('admin/create');
    },

    store: (req, res) => {
        const {
            titulo,
            marca,
            categoria,
            descripcion,
            imagen,
            precio
        } = req.body

        let productoNuevo = {
            id: products[products.length - 1].id + 1,
            titulo,
            marca,
            categoria,
            descripcion,
            imagen: req.file ? req.file.filename : 'default-image.png',
            precio: +precio,
            autor: 'Yo',
            carrito: false,
            destacado: false,
        }
        productos.push(productoNuevo)
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
        res.redirect('/admin')
    },

    //editar
    edit: (req, res) => {
        let producto = products.find(element => element.id === +req.params.id);
        res.render('admin/edit', {
            producto
        });
    },

    update: (req, res) => {
        let id = +req.params.id

        const {
            titulo,
            marca,
            categoria,
            descripcion,
            imagen,
            precio,
        } = req.body

        let producto = products.find(element => element.id == id);

        let productoEditado = {
            id: +req.params.id,
            titulo,
            marca,
            categoria,
            descripcion,
            imagen: req.file ? req.file.filename : null,
            precio: +precio,
            autor: 'Yo',
            carrito: false,
            destacado: false,

        }
        let modificado = products.map(producto => producto.id === +req.params.id ? productoEditado : producto)
        fs.writeFileSync(productsFilePath, JSON.stringify(modificado, null, 2));

        res.redirect('/admin')
    },
    //eliminar
    destroy: (req, res) => {
        products = products.filter(product => product.id !== +req.params.id)

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
        res.redirect('/admin')
    }

}
module.exports = controller;