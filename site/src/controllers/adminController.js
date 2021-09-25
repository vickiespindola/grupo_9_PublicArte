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
    store: function (req, res, next) {
        res.render('admin/create');
    },
    edit: function (req, res, next) {
        const {
            id
        } = req.params;
        let producto = products.find(element => element.id == id);
        res.render('admin/edit', {
            producto
        });
    },
    update: function (req, res, next) {
        res.render('admin/edit');
    },
    erase: function (req, res, next) {
        res.redirect('/admin');
    }
}
module.exports = controller;