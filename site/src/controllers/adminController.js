const products = require('../data/products.json')

const controller = {
    list: function (req, res,next) {
        res.render('admin/admin');
    },
    create: function (req, res,next) {
        res.render('admin/create');
    },
    store: function (req, res,next) {
        res.render('admin/create');
    },
    edit: function (req, res, next) {
        const {
            id
        } = req.params;
        let producto = products.find(element => element.id == id);
        res.render('admin/edit', {producto} );
    },
    update: function (req, res, next) {
        res.render('admin/edit');
    },
    erase: function (req, res , next) {
        res.redirect('/admin');
    }
}
module.exports = controller;