const {
    validationResult
} = require('express-validator');
const db = require('../database/models');

const {
    Console
} = require('console');
const sequelize = db.sequelize;

const controller = {
    //listar
    list: (req, res, next) => {

        db.Products.findAll({
                include: [{
                    all: true
                }],
                order: [
                    ['id', 'ASC']
                ]
            })
            .then(products => {
                res.render('admin/admin', {
                    products
                })
            })
            .catch((error) => res.send(error))

    },
    //crear
    create: (req, res, next) => {

        const categories = db.Categories.findAll()

        Promise.all([categories])
            .then(([categories]) => {
                return res.render('admin/create', {
                    categories
                });
            })

    },

    store: (req, res) => {

        const errors = validationResult(req);

        const {
            titulo,
            descripcion,
            precio,
            categoria
        } = req.body

        if (errors.isEmpty()) {
            db.Products.create({
                    name: titulo.trim(),
                    description: descripcion.trim(),
                    price: +precio.trim(),
                    categoriesId: +categoria,
                    usersId: req.session.userLogged.id,
                })
                .then((product) => {
                    if (req.files.length != 0) {
                        let images = req.files.map(image => {
                            let item = {
                                file: image.filename,
                                productsId: product.id
                            }
                            return item
                        })
                        db.Images.bulkCreate(images, {
                                validate: true
                            })
                            .then(() => {
                                return res.redirect('/admin')
                            })
                            .catch(error => {
                                res.render(error)
                            })
                    } else {
                        db.Images.create({
                                file: 'default-image.png',
                                productsId: product.id
                            })
                            .then(() => res.redirect('admin'))
                            .catch(error => {
                                res.render(error)
                            })
                    }
                })
                .catch(error => {
                    res.render(error)
                })
        } else {
            res.render('admin/create', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },

    //editar
    edit: (req, res) => {

        const categories = db.Categories.findAll()
        const products = db.Products.findByPk(+req.params.id, {
            include: [{
                all: true
            }]
        })
        const images = db.Images.findAll({
            where: productsId = +req.params.id
        })

        Promise.all([categories, products, images])
            .then(([categories, products]) => {
                return res.render('admin/edit', {
                    categories,
                    products,
                    images
                });
            })
            .catch(error => {
                res.render(error)
            })
    },

    update: (req, res) => {

        const errors = validationResult(req)

        const images = db.Categories.findAll()

        const {
            titulo,
            descripcion,
            precio,
            categoria
        } = req.body

        if (errors.isEmpty()) {
            db.Products.update({
                    name: titulo.trim(),
                    description: descripcion.trim(),
                    price: +precio.trim(),
                    categoriesId: +categoria,
                    usersId: req.session.userLogged.id,
                })
                .then((product) => {
                    if (req.files.length != 0) {
                        let images = req.files.map(image => {
                            let item = {
                                file: image.filename,
                                productsId: product.id
                            }
                            return item
                        })
                        db.Images.bulkCreate(images, {
                                validate: true
                            })
                            .then(() => {
                                return res.redirect('/admin')
                            })
                            .catch(error => {
                                res.render(error)
                            })
                    } else {
                        /* db.Images.create({
                            file: ,
                            productsId: product.id
                        })
                        .then(() => res.redirect('admin'))
                        .catch(error => {
                            res.render(error)
                        }) */
                    }
                })
                .catch(error => {
                    res.render(error)
                })

        } else {
            res.render('admin/edit', {
                errors: errors.mapped(),
                old: req.body
            })
        }

    },

    destroy: (req, res) => {
        db.Products.destroy({
                include: [{
                    all: true
                }],
                where: {
                    id: req.params.id
                }
            })
            .then(result => {
                return res.redirect("/admin")
            })
            .catch((error) => {
                res.send(error)
            })
    }

}
module.exports = controller;