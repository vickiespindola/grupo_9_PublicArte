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
                    ['name', 'ASC']
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
        const brands = db.Brands.findAll()

        Promise.all([categories, brands])
            .then(([categories, brands, products]) => {
                return res.render('admin/create', {
                    brands,
                    categories
                });
            })

    },

    store: (req, res) => {

        const errors = validationResult(req);
        const brand = db.Brands.findOne({
            where: {
                name: req.body.marca
            }
        });
        const category = db.Categories.findOne({
            where: {
                name: req.body.categorias
            }
        })
        const producer = db.Categories.findOne({
            where: {
                id: req.session.userLogged.id
            }
        })

        const {
            titulo,
            descripcion,
            precio
        } = req.body

        if (errors.isEmpty()) {
            Promise.All([category, brand, producer])
                .then(([category, brand, producer]) => {
                    db.Products.create({
                            name: titulo.trim(),
                            description: descripcion.trim(),
                            price: +precio.trim(),
                            categoriesId: category.id,
                            producersId: producer.id,
                            brandsId: brand.id
                        })
                        .then((product) => {
                            if (req.files.length > 0) {

                                const images = req.files.map(image => {
                                    let images = {
                                        file: image.filename,
                                        productsId: product.id
                                    }
                                })

                                db.Images.bulkCreate(images, {
                                        validate: true
                                    })
                                    .catch(error => {
                                        res.render(error)
                                    })
                            }
                            return res.redirect('/admin')
                        })
                        .catch(error => {
                            res.render(error)
                        })
                })
                .catch(error => {
                    res.render(error)
                })
        }
    },

    //editar
    edit: (req, res) => {

        const categories = db.Categories.findAll()
        const brands = db.Brands.findAll()
        const products = db.Products.findByPk(+req.params.id, {
            include: [{
                all: true
            }]
        })

        Promise.all([categories, brands, products])
            .then(([categories, brands, products]) => {
                return res.render('admin/edit', {
                    brands,
                    categories,
                    products
                });
            })
            .catch(error => {
                res.render(error)
            })

    },

    update: (req, res) => {

        const errors = validationResult(req)

        const brand = db.Brands.findOne({
            where: {
                name: req.body.marca
            }
        });
        const category = db.Categories.findOne({
            where: {
                name: req.body.categorias
            }
        })
        const producer = db.Categories.findOne({
            where: {
                id: req.session.userLogged.id
            }
        })

        const {
            titulo,
            descripcion,
            precio
        } = req.body

        if (errors.isEmpty()) {

            Promise.all([category, brand, producer])
                .then(([category, brand, producer]) => {
                    db.Products.update({
                        name: titulo.trim(),
                        description: descripcion.trim(),
                        price: +precio.trim(),
                        brandsId: brand.id,
                        producersId: producer.id,
                        categoriesId: category.id,
                    }, {
                        where: {
                            id: +req.params.id
                        }
                    })
                    .then(producto => {
                        res.redirect("/admin", {
                            producto
                        })
                    })
                    .catch(error => {
                        res.render(error)
                    })
                })
                .catch(error => {
                    res.render(error)
                })

        } else {
            res.render('user/editProfile', {
                errors: errors.mapped(),
                old: req.body
            })
        }

    },

    destroy: (req, res) => {
        db.Products.destroy({
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