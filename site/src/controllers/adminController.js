const fs = require('fs');
const path = require('path');
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
                            .then(() => res.redirect('/admin'))
                            .catch(error => {
                                res.render(error)
                            })
                    }
                })
                .catch(error => {
                    res.render(error)
                })
        } else {
            let categories = db.Categories.findAll()

            Promise.all([categories])
                .then(([categories]) => {
                    return res.render('admin/create', {
                        categories,
                        errors: errors.mapped(),
                        old: req.body,
                    });
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

        Promise.all([categories, products])
            .then(([categories, products]) => {
                return res.render('admin/edit', {
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


        if (errors.isEmpty()) {
            const {
                titulo,
                descripcion,
                precio,
                categoria
            } = req.body

            db.Products.update({
                    name: titulo.trim(),
                    description: descripcion.trim(),
                    price: +precio.trim(),
                    categoriesId: +categoria,
                    usersId: req.session.userLogged.id,
                }, {
                    where: {
                        id: +req.params.id
                    }
                })
                .then((product) => {
                    const imagesArray = req.files
                    if (imagesArray.length != 0 && imagesArray != undefined) {
                        const images = req.files.map(image => {
                            let item = {
                                file: image.filename,
                                productsId: +req.params.id
                            }
                            return item
                        })

                        db.Images.destroy({
                                where: {
                                    productsId: +req.params.id
                                }
                            })
                            .then(() => {
                                db.Images.bulkCreate(images, {
                                        validate: true
                                    })
                                    .then(() => {
                                        return res.redirect('/admin');
                                    })
                                    .catch(error => console.log(error))
                            })
                            .catch(error => {
                                res.send(error)
                            })
                    } else {
                        console.log("No se agregaron nuevas imagenes")
                    }
                })
                .then(() => {
                    return res.redirect('/admin');
                })
                .catch(error => console.log(error))

        } else {
            const products = db.Products.findByPk(+req.params.id, {
                include: [{
                    all: true
                }]
            })

            const categories = db.Categories.findAll()

            Promise.all([products, categories])
                .then(([products, categories]) => {
                    return res.render('admin/edit', {
                        products,
                        categories,
                        errors: errors.mapped(),
                        old: req.body,
                    });
                })
        }

    },

    destroy: (req, res) => {

        db.Products.findByPk(+req.params.id, {
                include: [{
                    all: true
                }],
            })
            .then(product => {
                product.images.forEach(item => {
                    if (fs.existsSync(path.join(__dirname, '../../public/img/products', item.file))) {
                        fs.unlinkSync(path.join(__dirname, '../../public/img/products', item.file))
                    }
                });
                db.Images.destroy({
                        where: {
                            productsId: +req.params.id
                        }
                    })
                    .then(() => {
                        db.Products.destroy({
                                where: {
                                    id: +req.params.id
                                }
                            })
                            .then(() => {
                                return res.redirect('/admin')
                            })
                            .catch(error => console.log(error))
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))

    }

}
module.exports = controller;